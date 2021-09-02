import { db } from 'data/db';
import { Collection } from './types';

export const CollectionsApi = {
  create: (collection: Collection) => {
    return db.collections.add(collection);
  },
  findAll: () => {
    return db.collections.orderBy('createdAt').toArray();
  },
  find: (id: number) => {
    return db.collections.get(id);
  },
};
