import { IconsApi } from 'data/icons';
import { keyBy } from 'lodash';
import { db } from 'data/db';
import { Icon } from './types';

export const addIconsToDb2 = async (icons: Icon[], collectionIdNo: number | string) => {
  const collectionIdString = String(collectionIdNo);

  const existingIcons = await IconsApi.findAllInCollection(collectionIdString);

  const existingIconsMap = keyBy(existingIcons, 'name');

  const iconsToAdd: Icon[] = [];

  icons.forEach((icon) => {
    if (!existingIconsMap[icon.name]) {
      iconsToAdd.push(icon);
    }
  });

  if (iconsToAdd.length) {
    return db.icons.bulkAdd(iconsToAdd);
  }

  return Promise.resolve();
};

export const addIconsToDb = async (
  files: {
    path: string;
    name: string;
  }[],
  collectionIdNo: number | string
) => {
  const iconsToAdd: Icon[] = [];

  files.forEach((file) => {
    const [name, type] = file.name.split('.');

    iconsToAdd.push({
      name,
      collectionId: `${collectionIdNo}`,
      mime: type,
      byteSize: 1000,
      imageSrc: file.path,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  });

  return addIconsToDb2(iconsToAdd, collectionIdNo);
};
