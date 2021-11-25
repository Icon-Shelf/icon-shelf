import os from 'os';

export function getCopyShortcut() {
  if (os.platform() === 'darwin') {
    return '⌘⇧C';
  }

  return 'Ctrl+Shift+c';
}

export function getOpenText() {
  switch (os.platform()) {
    case 'darwin':
      return 'Open in finder';
    case 'win32':
      return 'Open in explorer';
    case 'linux':
      return 'Open in file manager';
    default:
      return 'Open in file manager';
  }
}

export function getSearchShortcut() {
  if (os.platform() === 'darwin') {
    return '⌘f';
  }

  return 'Ctrl+f';
}
