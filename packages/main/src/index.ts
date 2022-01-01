import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  protocol,
  screen,
  shell,
} from "electron";
import { join } from "path";
import {
  existsSync,
  mkdirSync,
  writeFile,
  unlinkSync,
  rmdirSync,
  readFileSync,
} from "fs";
import { URL } from "url";
import "./security-restrictions";
import { optimize as svgOptimize } from "svgo";
import { getAllFiles } from "./utils/getAllFiles";
import { svgoPluginsConfiguration } from "./constants/svgoPluginsConfiguration";
import type { FSWatcher } from "chokidar";
import { watch as chokidarWatch } from "chokidar";
import MenuBuilder from "./menu";
import { activateAnalytics } from "./utils/analytics";
import AppUpdater from "./app-updater";

const isSingleInstance = app.requestSingleInstanceLock();
const isDevelopment = import.meta.env.MODE === "development";

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

// Install "react devtools"
if (isDevelopment) {
  app
    .whenReady()
    .then(() => import("electron-devtools-installer"))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) =>
      installExtension(REACT_DEVELOPER_TOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true,
        },
      })
    )
    .catch((e) => console.error("Failed install extension:", e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  const mainScreen = screen.getPrimaryDisplay();
  const dimensions = mainScreen.size;

  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    width: dimensions.width - 350,
    height: dimensions.height - 200,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, "../../preload/dist/index.cjs"),
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
  mainWindow.on("ready-to-show", () => {
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
      : new URL(
          "../renderer/dist/index.html",
          "file://" + __dirname
        ).toString();

  await mainWindow.loadURL(pageUrl);

  activateAnalytics();
};

app.on("second-instance", () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error("Failed create window:", e));

protocol.registerSchemesAsPrivileged([
  {
    scheme: "icon-image",
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
    },
  },
]);

app.whenReady().then(() => {
  protocol.registerFileProtocol("icon-image", (request, callback) => {
    const url = decodeURI(request.url.replace("icon-image://", ""));

    callback(url);
  });
});

// Auto-updates
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(() => new AppUpdater())
    .catch((e) => console.error("Failed check updates:", e));
}

// custom listeners
ipcMain.on("get-all-icon-in-folder", async (event, arg) => {
  if (arg.folderPath) {
    const iconsFolderPath = arg.folderPath.replace(/\/$/, "");

    try {
      const files = await getAllFiles(iconsFolderPath);
      event.reply("get-all-icon-in-folder_reply", files, arg.collectionId);
    } catch (e) {
      console.log(e);
    }
  }
});

ipcMain.on("get-default-icon-storage-folder", (event) => {
  const defaultUserDataStoragePath = app.getPath("userData");

  const defaultIconStorageFolder = join(
    defaultUserDataStoragePath,
    "icon-library"
  );

  event.returnValue = defaultIconStorageFolder;
});

ipcMain.on("select-folder", async (event) => {
  if (mainWindow) {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });

    event.returnValue = result.filePaths;
  }
});

ipcMain.on(
  "create-and-add-icon-to-folder",
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
        if (!existsSync(folderPath)) {
          mkdirSync(folderPath, { recursive: true });
        }

        const buffer = Buffer.from(data, "base64");

        let fileData: Buffer | string = buffer;

        if (optimizeIcon) {
          fileData = svgOptimize(buffer, {
            plugins: svgoPluginsConfiguration,
          }).data;
        }

        const formattedPath = join(folderPath, filename);

        writeFile(formattedPath, fileData, () => {
          console.log();
        });
      }
    });
  }
);

ipcMain.on("remove-icon-from-folder", (_, props) => {
  const iconFilePath = join(props.folderSrc, props.fileName);

  try {
    unlinkSync(iconFilePath);
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on("remove-collection-folder", (_, folderSrc) => {
  const folderPath = join(folderSrc);

  try {
    rmdirSync(folderPath, { recursive: true });
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on("open-collection-folder", (_, folderSrc) => {
  const folderPath = join(folderSrc);
  if (!existsSync(folderPath)) {
    // If directory does not exist, create one
    mkdirSync(folderPath, { recursive: true });
  }
  shell.openPath(folderPath);
});

ipcMain.on("open-collection-folder-icon", (_, props) => {
  const iconFilePath = join(props.folderSrc, props.fileName);

  shell.showItemInFolder(iconFilePath);
});

ipcMain.on("get-icon-file-content", (event, fileSrc) => {
  if (existsSync(fileSrc)) {
    const svg = readFileSync(fileSrc);

    event.returnValue = svg.toString();
  }
});

let watcher: FSWatcher;

ipcMain.on("collection-switch", async (event, props) => {
  if (watcher) {
    await watcher.close();
  }

  watcher = chokidarWatch(props.folderSrc, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    ignoreInitial: true,
    depth: 1,
    awaitWriteFinish: true,
  });

  const eventReply = () => {
    mainWindow?.webContents.send(
      "collection-folder-change_reply",
      props?.collectionId
    );
  };

  watcher.on("add", eventReply).on("unlink", eventReply);
});
