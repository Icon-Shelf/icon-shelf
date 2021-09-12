// eslint-disable-next-line import/no-cycle
import { db } from 'data/db';
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

    return db.collections.delete(parsedId);
  },
};
