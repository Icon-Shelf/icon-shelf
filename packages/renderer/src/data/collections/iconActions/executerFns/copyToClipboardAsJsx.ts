import type { ExecuterProps } from '../useOnActionClick';

export const copyToClipboardAsJsx = async ({ icon }: ExecuterProps) => {
  const iconContent = window.electron.ipcRenderer.sendSync('get-icon-file-content', icon.imageSrc);

  const copyText = window.htmlToJsx.convert(iconContent);

  navigator.clipboard.writeText(copyText);
};
