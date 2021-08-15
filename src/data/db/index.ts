import Dexie from 'dexie';
import { Icon } from 'data/icons/types';
import { bootstrapDb } from './bootstrap';

export class IconShelfDatabase extends Dexie {
  icons: Dexie.Table<Icon, number>;

  constructor() {
    super('IconShelfDatabase');

    this.version(1).stores({
      icons: '++id,name,createdAt,updatedAt',
    });

    this.icons = this.table('icons');
  }
}

const db = new IconShelfDatabase();
bootstrapDb(db);

export { db };
