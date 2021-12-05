import { ipcRenderer } from 'electron';
import HTMLtoJSX from 'htmltojsx';
import { ExecuterProps } from '../useOnActionClick';

const converter = new HTMLtoJSX({
  createClass: false,
});

export const copyToClipboardAsJsx = async ({ icon }: ExecuterProps) => {
  const iconContent = ipcRenderer.sendSync('get-icon-file-content', icon.imageSrc);

  const copyText = converter.convert(iconContent);

  navigator.clipboard.writeText(copyText);
};
