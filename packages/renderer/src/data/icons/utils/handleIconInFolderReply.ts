import { db } from '/@/data/db';
import { keyBy } from 'lodash';
import type { QueryClient } from '@tanstack/react-query';
import type { Icon } from '..';
import { IconsApi } from '..';

export async function handleIconInFolderReply(
  queryClient: QueryClient,
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

  const existingIcons = await IconsApi.getAllIconsInCollection({
    collectionId: collectionIdString,
  });

  const existingIconsMap = keyBy(existingIcons, 'name');
  const folderIconsMap = keyBy(files, 'name');

  const iconsToAdd: Icon[] = [];
  const iconsToDelete: number[] = [];

  files.forEach((file) => {
    const [name, type] = file.name.split('.');

    const toUpdateIcon =
      existingIconsMap[name] && existingIconsMap[name].updatedAt !== file.updatedAt;

    if (existingIconsMap[name] && toUpdateIcon) {
      iconsToDelete.push(existingIconsMap[name].id as number);
    }

    if ((!existingIconsMap[name] || toUpdateIcon) && type === 'svg') {
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
        queryClient.invalidateQueries(['icons-list', collectionIdString]);
      })
      .catch(() => {});
  }

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
        queryClient.invalidateQueries(['icons-list', collectionIdString]);
      })
      .catch(() => {});
  }
}
