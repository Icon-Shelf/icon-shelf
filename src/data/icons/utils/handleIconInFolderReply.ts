import { db } from 'data/db';
import { IpcRendererEvent } from 'electron';
import { keyBy } from 'lodash';
import { QueryClient } from 'react-query';
import { Icon, IconsApi } from '..';

export async function handleIconInFolderReply(
  queryClient: QueryClient,
  _: IpcRendererEvent,
  files: {
    name: string;
    imageSrc: string;
    byteSize: number;
    createdAt: number;
    updatedAt: number;
  }[],
  collectionIdNo: number
) {
  const collectionIdString = String(collectionIdNo);

  const existingIcons = await IconsApi.findAllInCollection(collectionIdString);

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
      })
      .catch(() => {});
  }
}
