import { ipcRenderer } from 'electron';
import { ExecuterProps } from '../useOnActionClick';

export const copyToClipboardAsSvg = async ({ icon }: ExecuterProps) => {
  const iconContents = ipcRenderer.sendSync('get-icon-file-content', icon.imageSrc);

  navigator.clipboard.writeText(iconContents);
};
