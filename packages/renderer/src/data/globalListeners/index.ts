import { db } from '/@/data/db';

const cssTheme = localStorage.getItem('theme');
if (cssTheme) {
  if (cssTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const setupGlobalListeners = () => {
  window.electron.ipcRenderer.on('reset-app-clear-data', async () => {
    await Promise.all([db.icons.clear(), db.collections.clear()]);
    localStorage.clear();
    window.location.reload();
  });

  window.electron.ipcRenderer.on('toggle-dark-mode', async () => {
    const isDarkThemeApplied = document.documentElement.classList.contains('dark');

    if (isDarkThemeApplied) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    localStorage.setItem('theme', isDarkThemeApplied ? 'light' : 'dark');
  });
};
