import { ipcRenderer } from 'electron';
import { keyBy } from 'lodash';
import { db } from 'data/db';
import { QueryClient } from 'react-query';
import { Icon } from './types';
import { IconsApi } from './api';
import { CollectionsApi } from 'data/collections/api';

export const checkIfAnyNewIconsInFolder = async (
  collectionId: string,
  queryClient: QueryClient
) => {
  if (!parseInt(collectionId)) {
    return;
  }

  const collection = await CollectionsApi.find(parseInt(collectionId));

  if (collection) {
    ipcRenderer.send('get-all-icon-in-folder', {
      folderPath: collection?.folderSrc,
    });
  }

  ipcRenderer.once(
    'get-all-icon-in-folder_reply',
    async (
      _,
      files: {
        path: string;
        name: string;
      }[]
    ) => {
      const existingIcons = await IconsApi.findAllInCollection(collectionId);

      const existingIconsMap = keyBy(existingIcons, 'name');
      const folderIconsMap = keyBy(files, 'name');

      const iconsToAdd: Icon[] = [];

      files.forEach((file) => {
        const [name, type] = file.name.split('.');

        if (!existingIconsMap[name] && type === 'svg') {
          iconsToAdd.push({
            name,
            collectionId: collectionId,
            mime: type,
            byteSize: 1000,
            imageSrc: file.path,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        }
      });

      if (iconsToAdd.length) {
        db.icons
          .bulkAdd(iconsToAdd)
          .then(() => {
            queryClient.invalidateQueries('icons-list');
            return true;
          })
          .catch(() => {});
      }

      const iconsToDelete: number[] = [];
      existingIcons.forEach((file) => {
        const { id, name, mime } = file;

        if (!folderIconsMap[`${name}.${mime}`] && id) {
          iconsToDelete.push(id);
        }
      });

      if (iconsToDelete.length) {
        db.icons
          .bulkDelete(iconsToDelete)
          .then(() => {
            queryClient.invalidateQueries('icons-list');
            return true;
          })
          .catch(() => {});
      }
    }
  );
};
