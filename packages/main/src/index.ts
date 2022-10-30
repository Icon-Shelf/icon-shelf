import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  nativeImage,
  Notification,
  protocol,
  screen,
  shell,
} from 'electron';
import { join } from 'path';
import {
  existsSync,
  mkdirSync,
  unlinkSync,
  readFileSync,
  rmSync,
  copyFile,
  rename,
  promises as promiseFs,
} from 'fs';
import { URL } from 'url';
import './security-restrictions';
import type { OptimizedSvg } from 'svgo';
import { optimize as svgOptimize } from 'svgo';
import type { Plugin } from 'svgo';
import { getAllFiles } from './utils/getAllFiles';
import type { FSWatcher } from 'chokidar';
import { watch as chokidarWatch } from 'chokidar';
import MenuBuilder from './menu';
import { activateAnalytics } from './utils/analytics';
import AppUpdater from './app-updater';
import { debounce } from 'lodash';
import type { MessageBoxOptions } from 'electron';

const isSingleInstance = app.requestSingleInstanceLock();
const isDevelopment = import.meta.env.MODE === 'development';

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

// Install "react devtools"
if (isDevelopment) {
  app
    .whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) =>
      installExtension(REACT_DEVELOPER_TOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true,
        },
      })
    )
    .catch((e) => console.error('Failed install extension:', e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  const mainScreen = screen.getPrimaryDisplay();
  const dimensions = mainScreen.size;

  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    width: dimensions.width - 350,
    height: dimensions.height - 200,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: join(app.getAppPath(), 'packages/preload/dist/index.cjs'),
    },
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    if (isDevelopment) {
      mainWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();

  await mainWindow.loadURL(pageUrl);

  activateAnalytics();
};

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed create window:', e));

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'icon-image',
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
    },
  },
]);

app.whenReady().then(() => {
  protocol.registerFileProtocol('icon-image', (request, callback) => {
    let url = decodeURI(request.url.replace('icon-image://', ''));
    url = url.replace(/\?.*/, '');

    if (process.platform === 'win32') {
      url = url.charAt(0).toUpperCase() + ':' + url.slice(1);
    }

    callback(url);
  });
});

// Auto-updates
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(() => new AppUpdater())
    .catch((e) => console.error('Failed check updates:', e));
}

// custom listeners
ipcMain.on('get-all-icon-in-folder', async (event, arg) => {
  if (arg.folderPath) {
    const iconsFolderPath = arg.folderPath.replace(/\/$/, '');

    try {
      const files = await getAllFiles(iconsFolderPath);
      event.reply('get-all-icon-in-folder_reply', files, arg.collectionId);
    } catch (e) {
      console.log(e);
    }
  }
});

ipcMain.on('get-default-icon-storage-folder', (event) => {
  const defaultUserDataStoragePath = app.getPath('userData');

  const defaultIconStorageFolder = join(defaultUserDataStoragePath, 'icon-library');

  event.returnValue = defaultIconStorageFolder;
});

ipcMain.on('select-folder', async (event) => {
  if (mainWindow) {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    event.returnValue = result.filePaths;
  }
});

ipcMain.on(
  'create-and-add-icon-to-folder',
  async (
    _,
    {
      uploadedIcons,
      folderPath,
      optimizeIcon,
      svgoSettings,
    }: {
      uploadedIcons: { dataURL: string; fileName: string }[];
      folderPath: string;
      optimizeIcon: boolean;
      svgoSettings: Plugin[];
    }
  ) => {
    const regex = /^data:.+\/(.+);base64,(.*)$/;

    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }

    const filePromiseList: Promise<void>[] = [];
    uploadedIcons.forEach((icon) => {
      const dataUrl = icon.dataURL;

      const matches = dataUrl?.match(regex);
      const filename = icon.fileName;
      // const ext = matches?.[1];
      const data = matches?.[2];
      if (data && filename) {
        const formattedPath = join(folderPath, filename);

        if (existsSync(formattedPath)) {
          const dialogOpts: MessageBoxOptions = {
            type: 'error',
            message: `Icon with the name ${filename} is already present in the collection`,
            buttons: ['Skip', 'Override'],
            title: 'Icon is already present in the collection',
          };

          const window = BrowserWindow.getFocusedWindow();
          if (window) {
            const response = dialog.showMessageBoxSync(window, dialogOpts);
            if (response === 0) {
              return;
            }
          }
        }

        const buffer = Buffer.from(data, 'base64');

        let fileData: Buffer | string = buffer;

        if (optimizeIcon) {
          try {
            const svgOptimizeResult = svgOptimize(buffer, {
              plugins: svgoSettings,
            });

            fileData = (svgOptimizeResult as OptimizedSvg).data;
          } catch {
            console.log('error happened in svgOptimize');
          }
        }

        filePromiseList.push(promiseFs.writeFile(formattedPath, fileData));
      }
    });

    Promise.all(filePromiseList);
  }
);

ipcMain.on('remove-icon-from-folder', (_, props) => {
  const iconFilePath = join(props.folderSrc, props.fileName);

  try {
    unlinkSync(iconFilePath);
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on('svg-optimize-icon', (event, props) => {
  const iconFilePath = join(props.folderSrc, props.fileName);

  try {
    const svg = readFileSync(iconFilePath);

    const svgOptimizeResult = svgOptimize(svg, {
      path: iconFilePath,
      plugins: props.svgoSettings,
    });
    const fileData = (svgOptimizeResult as OptimizedSvg).data;

    promiseFs.writeFile(iconFilePath, fileData);
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on('remove-collection-folder', (_, folderSrc) => {
  const folderPath = join(folderSrc);

  try {
    rmSync(folderPath, { recursive: true });
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on('open-collection-folder', (_, folderSrc) => {
  const folderPath = join(folderSrc);
  if (!existsSync(folderPath)) {
    // If directory does not exist, create one
    mkdirSync(folderPath, { recursive: true });
  }
  shell.openPath(folderPath);
});

ipcMain.on('open-collection-folder-icon', (_, props) => {
  const iconFilePath = join(props.folderSrc, props.fileName);

  shell.showItemInFolder(iconFilePath);
});

ipcMain.on('get-icon-file-content', (event, fileSrc) => {
  if (existsSync(fileSrc)) {
    const svg = readFileSync(fileSrc);

    event.returnValue = svg.toString();
  }
});

let watcher: FSWatcher;

ipcMain.on('collection-switch', async (event, props) => {
  if (watcher) {
    await watcher.close();
  }

  watcher = chokidarWatch(props.folderSrc, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    ignoreInitial: true,
    depth: 1,
    awaitWriteFinish: true,
  });

  const eventReply = debounce(() => {
    mainWindow?.webContents.send('collection-folder-change_reply', props?.collectionId);
  }, 100);

  watcher.on('add', eventReply).on('change', eventReply).on('unlink', eventReply);
});

const dragIcon = nativeImage.createFromDataURL(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
);

ipcMain.on('drag-icon-start', async (event, iconsPaths: string[]) => {
  event.sender.startDrag({
    file: iconsPaths[0],
    icon: dragIcon,
  });
});

ipcMain.on(
  'copy-or-move-icon-to-folder',
  (
    event,
    {
      fileName,
      iconPath,
      toFolder,
      type,
    }: { fileName: string; iconPath: string; toFolder: string; type: 'copy' | 'move' }
  ) => {
    if (existsSync(iconPath)) {
      const folderPath = join(toFolder);
      if (!existsSync(folderPath)) {
        // If directory does not exist, create one
        mkdirSync(folderPath, { recursive: true });
      }

      if (type === 'copy') {
        copyFile(iconPath, join(toFolder, fileName), (err) => {
          if (err) throw err;
        });
      } else if (type === 'move') {
        rename(iconPath, join(toFolder, fileName), (err) => {
          if (err) throw err;
        });
      }
    }
  }
);

ipcMain.on('send-notification', async (event, props) => {
  new Notification({ title: props.title, body: props.message }).show();
});
