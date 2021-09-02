import { ipcRenderer } from 'electron';
import { keyBy } from 'lodash';
import { db } from 'data/db';
import { QueryClient } from 'react-query';
import { Icon } from './types';
import { IconsApi } from './api';

export const checkIfAnyNewIconsInFolder = (queryClient: QueryClient) => {
  ipcRenderer.send('get-all-icon-in-folder');

  ipcRenderer.once(
    'get-all-icon-in-folder_reply',
    async (
      _,
      files: {
        path: string;
        name: string;
      }[]
    ) => {
      const existingIcons = await IconsApi.findAll();

      const existingIconsMap = keyBy(existingIcons, 'name');
      const folderIconsMap = keyBy(files, 'name');

      const iconsToAdd: Icon[] = [];

      files.forEach((file) => {
        const [name, type] = file.name.split('.');

        if (!existingIconsMap[name] && type === 'svg') {
          iconsToAdd.push({
            name,
            collectionId: '1',
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
