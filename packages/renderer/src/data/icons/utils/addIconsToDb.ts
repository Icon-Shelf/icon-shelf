import { IconsApi } from '/@/data/icons';
import { keyBy } from 'lodash';
import { db } from '/@/data/db';
import type { Icon } from '../types';

export const addIconsToDb = async (icons: Icon[], collectionIdNo: number | string) => {
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
    // eslint-disable-next-line no-console
    return db.icons.bulkAdd(iconsToAdd).catch((e) => console.log(e));
  }

  return Promise.resolve();
};
