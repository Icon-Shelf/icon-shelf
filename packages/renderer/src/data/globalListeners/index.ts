import { db } from '/@/data/db';

const localStorageTheme = localStorage.getItem('theme');
if (
  localStorageTheme === 'dark' ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
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
