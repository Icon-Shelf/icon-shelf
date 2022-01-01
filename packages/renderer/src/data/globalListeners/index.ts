import { db } from "/@/data/db";

export const setupGlobalListeners = () => {
  window.electron.ipcRenderer.on("reset-app-clear-data", async () => {
    await Promise.all([db.icons.clear(), db.collections.clear()]);
    localStorage.clear();
    window.location.reload();
  });
};
