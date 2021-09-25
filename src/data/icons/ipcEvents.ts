import { ipcRenderer } from 'electron';
import { keyBy } from 'lodash';
import { db } from 'data/db';
import { QueryClient } from 'react-query';
import { CollectionsApi } from 'data/collections/api';
import { Icon } from './types';
import { IconsApi } from './api';

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
      collectionId: collection.id,
      folderPath: collection.folderSrc,
    });
  }

  ipcRenderer.once(
    'get-all-icon-in-folder_reply',
    async (
      _,
      files: {
        name: string;
        imageSrc: string;
        byteSize: number;
        createdAt: number;
        updatedAt: number;
      }[],
      collectionIdNo: number
    ) => {
      const collectionIdString = String(collectionIdNo);

      const existingIcons = await IconsApi.findAllInCollection(
        collectionIdString
      );

      const existingIconsMap = keyBy(existingIcons, 'name');
      const folderIconsMap = keyBy(files, 'name');

      const iconsToAdd: Icon[] = [];

      files.forEach((file) => {
        const [name, type] = file.name.split('.');

        if (!existingIconsMap[name] && type === 'svg') {
          iconsToAdd.push({
            name,
            collectionId: collectionIdString,
            mime: type,
            byteSize: file.byteSize,
            imageSrc: file.imageSrc,
            createdAt: file.createdAt,
            updatedAt: file.updatedAt,
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
