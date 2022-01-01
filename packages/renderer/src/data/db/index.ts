import Dexie from "dexie";
import type { Icon } from "/@/data/icons/types";
import type { Collection } from "/@/data/collections";
import { bootstrapDb } from "./bootstrap";

export class IconShelfDatabase extends Dexie {
  icons: Dexie.Table<Icon, number>;

  collections: Dexie.Table<Collection, number>;

  constructor() {
    super("IconShelfDatabase");

    this.version(2).stores({
      icons: "++id,name,collectionId,createdAt,updatedAt,&[name+collectionId]",
      collections: "++id,name,createdAt,updatedAt",
    });

    this.icons = this.table("icons");
    this.collections = this.table("collections");
  }
}

const db = new IconShelfDatabase();
bootstrapDb(db);

export { db };
