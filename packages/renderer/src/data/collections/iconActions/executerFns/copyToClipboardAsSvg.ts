import type { ExecuterProps } from '../useOnActionClick';

export const copyToClipboardAsSvg = async ({ icon }: ExecuterProps) => {
  const iconContents = window.electron.ipcRenderer.sendSync('get-icon-file-content', icon.imageSrc);
  await navigator.clipboard.writeText(iconContents);
};
