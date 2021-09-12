import { db } from 'data/db';
import { IconsApi } from 'data/icons';
import { Collection } from './types';

export const CollectionsApi = {
  create: (collection: Collection) => {
    return db.collections.add(collection);
  },
  findAll: () => {
    return db.collections.orderBy('createdAt').toArray();
  },
  find: (id: number | string) => {
    const parsedId: number = parseInt(id as string);

    return db.collections.get(parsedId);
  },
  delete: (id: number | string) => {
    const parsedId: number = parseInt(id as string);

    return db.collections.delete(parsedId).then(async () => {
      const icons = await IconsApi.findAllInCollection(`${parsedId}`);

      const iconsToDelete = icons.map((icon) => icon.id as number);

      db.icons.bulkDelete(iconsToDelete);
    });
  },
};
