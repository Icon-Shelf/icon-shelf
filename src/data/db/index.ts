import Dexie from 'dexie';
import { Icon } from 'data/icons/types';
import { Collection } from 'data/collections';
// eslint-disable-next-line import/no-cycle
import { bootstrapDb } from './bootstrap';

export class IconShelfDatabase extends Dexie {
  icons: Dexie.Table<Icon, number>;

  collections: Dexie.Table<Collection, number>;

  constructor() {
    super('IconShelfDatabase');

    this.version(1).stores({
      icons: '++id,name,collectionId,createdAt,updatedAt',
      collections: '++id,name,createdAt,updatedAt',
    });

    this.icons = this.table('icons');
    this.collections = this.table('collections');
  }
}

const db = new IconShelfDatabase();
bootstrapDb(db);

export { db };
