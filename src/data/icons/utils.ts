import { IconsApi } from 'data/icons';
import { keyBy } from 'lodash';
import { db } from 'data/db';
import { Icon } from './types';

export const addIconsToDb = async (
  files: {
    path: string;
    name: string;
  }[],
  collectionIdNo: number | string
) => {
  const collectionIdString = String(collectionIdNo);

  const existingIcons = await IconsApi.findAllInCollection(collectionIdString);

  const existingIconsMap = keyBy(existingIcons, 'name');

  const iconsToAdd: Icon[] = [];

  files.forEach((file) => {
    const [name, type] = file.name.split('.');

    if (!existingIconsMap[name] && type === 'svg') {
      iconsToAdd.push({
        name,
        collectionId: collectionIdString,
        mime: type,
        byteSize: 1000,
        imageSrc: file.path,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  });

  if (iconsToAdd.length) {
    return db.icons.bulkAdd(iconsToAdd);
  }

  return Promise.resolve();
};
