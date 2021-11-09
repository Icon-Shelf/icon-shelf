import { ipcRenderer } from 'electron';
import { CollectionsApi } from 'data/collections/api';

export const checkIfAnyNewIconsInFolder = async (collectionId: string) => {
  if (!parseInt(collectionId)) {
    return;
  }

  const collection = await CollectionsApi.find(parseInt(collectionId));

  if (collection) {
    ipcRenderer.send('get-all-icon-in-folder', {
      collectionId: collection.id,
      folderPath: collection.folderSrc,
    });
  }
};
