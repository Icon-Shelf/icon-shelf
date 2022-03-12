import type { ExecuterProps } from '../useOnActionClick';
import type { Collection } from '../../types';

interface Props extends ExecuterProps {
  targetCollection: Collection;
}

export const copyIconToCollection = async ({ icon, targetCollection }: Props) => {
  await window.electron.ipcRenderer.send('copy-or-move-icon-to-folder', {
    fileName: `${icon.name}.${icon.mime}`,
    iconPath: icon.imageSrc,
    toFolder: targetCollection.folderSrc,
    type: 'copy',
  });
};

export const moveIconToCollection = async ({ icon, targetCollection }: Props) => {
  await window.electron.ipcRenderer.send('copy-or-move-icon-to-folder', {
    fileName: `${icon.name}.${icon.mime}`,
    iconPath: icon.imageSrc,
    toFolder: targetCollection.folderSrc,
    type: 'move',
  });
};
