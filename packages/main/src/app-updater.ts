import { autoUpdater } from 'electron-updater';
import { dialog } from 'electron';
import log from 'electron-log';
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
      // log.info("update-downloaded", [
      //   event,
      //   releaseNotes,
      //   releaseName,
      //   releaseDate,
      //   updateURL,
      // ]);

      const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail:
          'A new version of Icon Shelf has been downloaded. Restart the application to apply the updates.',
      };

      dialog.showMessageBox(dialogOpts).then(({ response }) => {
        if (response === 0) autoUpdater.quitAndInstall();
      });
    });

    autoUpdater.checkForUpdatesAndNotify();

    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 1000 * 60 * 60);
  }
}
