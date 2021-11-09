import { db } from 'data/db';
import { ipcRenderer } from 'electron';

export const setupGlobalListeners = () => {
  ipcRenderer.on('reset-app-clear-data', async () => {
    await Promise.all([db.icons.clear(), db.collections.clear()]);
    localStorage.clear();
    window.location.reload();
  });
};
