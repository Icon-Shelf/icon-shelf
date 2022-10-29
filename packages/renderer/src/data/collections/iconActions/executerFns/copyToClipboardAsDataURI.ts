import type { ExecuterProps } from '../useOnActionClick';

export const copyToClipboardAsDataURI = async ({ icon }: ExecuterProps) => {
  const iconContents = window.electron.ipcRenderer.sendSync('get-icon-file-content', icon.imageSrc);
  const base64SVG = window.btoa(iconContents);
  const copyText = `data:image/svg+xml;base64,${base64SVG}`;

  await navigator.clipboard.writeText(copyText);
};
