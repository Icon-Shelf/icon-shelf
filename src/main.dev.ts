/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, screen, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import electronDl, { download } from 'electron-dl';
import { Icon } from 'data/icons';
import fs from 'fs';
import { optimize as svgOptimize } from 'svgo';

import chokidar, { FSWatcher } from 'chokidar';
import { svgoPluginsConfiguration } from './main/constants/svgoPluginsConfiguration';
import { activateAnalytics } from './main/utils/analytics';
import { getAllFiles } from './main/utils/getAllFiles';
import MenuBuilder from './menu';
import packageJson from './package.json';

electronDl();

let watcher: FSWatcher;

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const mainScreen = screen.getPrimaryDisplay();
  const dimensions = mainScreen.size;

  mainWindow = new BrowserWindow({
    show: false,
    width: dimensions.width - 350,
    height: dimensions.height - 200,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  activateAnalytics();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// custom listeners
ipcMain.on(
  'download-icon',
  async (
    event,
    info: {
      icon: Icon;
      url: string;
      storagePath: string;
    }
  ) => {
    if (mainWindow) {
      await download(mainWindow, info.url, {
        directory: info.storagePath,
        filename: info.icon.name,
      });

      event.reply('download-icon-reply', { icon: info.icon });
    }
  }
);

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

  const defaultIconStorageFolder = path.join(defaultUserDataStoragePath, 'icon-library');

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
    }: {
      uploadedIcons: { dataURL: string; fileName: string }[];
      folderPath: string;
      optimizeIcon: boolean;
    }
  ) => {
    const regex = /^data:.+\/(.+);base64,(.*)$/;

    uploadedIcons.forEach((icon) => {
      const dataUrl = icon.dataURL;

      const matches = dataUrl?.match(regex);
      const filename = icon.fileName;
      // const ext = matches?.[1];
      const data = matches?.[2];
      if (data && filename) {
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }

        const buffer = Buffer.from(data, 'base64');

        let fileData: Buffer | string = buffer;

        if (optimizeIcon) {
          fileData = svgOptimize(buffer, {
            plugins: svgoPluginsConfiguration,
          }).data;
        }

        const formattedPath = path.join(folderPath, filename);

        fs.writeFile(formattedPath, fileData, () => {});
      }
    });
  }
);

ipcMain.on('remove-icon-from-folder', (_, props) => {
  const iconFilePath = path.join(props.folderSrc, props.fileName);

  try {
    fs.unlinkSync(iconFilePath);
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on('remove-collection-folder', (_, folderSrc) => {
  const folderPath = path.join(folderSrc);

  try {
    fs.rmdirSync(folderPath, { recursive: true });
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on('open-collection-folder', (_, folderSrc) => {
  const folderPath = path.join(folderSrc);
  if (!fs.existsSync(folderPath)) {
    // If directory does not exist, create one
    fs.mkdirSync(folderPath, { recursive: true });
  }
  shell.openPath(folderPath);
});

ipcMain.on('open-collection-folder-icon', (_, props) => {
  const iconFilePath = path.join(props.folderSrc, props.fileName);

  shell.showItemInFolder(iconFilePath);
});

ipcMain.on('get-current-app-version', (event) => {
  event.returnValue = packageJson.version;
});

ipcMain.on('get-icon-file-content', (event, fileSrc) => {
  if (fs.existsSync(fileSrc)) {
    const svg = fs.readFileSync(fileSrc);

    event.returnValue = svg.toString();
  }
});

ipcMain.on('collection-switch', async (event, props) => {
  if (watcher) {
    await watcher.close();
  }

  watcher = chokidar.watch(props.folderSrc, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    ignoreInitial: true,
    depth: 1,
    awaitWriteFinish: true,
  });

  const eventReply = () => {
    event.reply('collection-folder-change_reply', props.collectionId);
  };

  watcher.on('add', eventReply).on('unlink', eventReply);
});
