import type { UpdateDownloadedEvent } from 'electron-updater';
import { autoUpdater } from 'electron-updater';
import type { MessageBoxOptions } from 'electron';
import { BrowserWindow, dialog } from 'electron';
import log from 'electron-log';
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;

    autoUpdater.on('update-downloaded', (event: UpdateDownloadedEvent) => {
      // log.info("update-downloaded", [
      //   event,
      //   releaseNotes,
      //   releaseName,
      //   releaseDate,
      //   updateURL,
      // ]);

      const dialogOpts: MessageBoxOptions = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message:
          process.platform === 'win32'
            ? (event.releaseNotes as string)
            : (event.releaseName as string),
        detail:
          'A new version of Icon Shelf has been downloaded. Restart the application to apply the updates.',
      };

      const window = BrowserWindow.getFocusedWindow();
      if (window) {
        dialog.showMessageBox(window, dialogOpts).then(({ response }) => {
          if (response === 0) autoUpdater.quitAndInstall();
        });
      }
    });

    autoUpdater.checkForUpdatesAndNotify();

    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 1000 * 60 * 60);
  }
}
