import type { ExecuterProps } from '../useOnActionClick';

export const copyToClipboardAsBase64 = async ({ icon }: ExecuterProps) => {
  const iconContents = window.electron.ipcRenderer.sendSync('get-icon-file-content', icon.imageSrc);
  const copyText = window.btoa(iconContents)
  await navigator.clipboard.writeText(copyText);
};
