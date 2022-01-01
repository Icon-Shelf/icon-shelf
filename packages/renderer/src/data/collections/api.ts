import { db } from "../db";
import { IconsApi } from "../icons";
import type { Collection } from "./types";

export const CollectionsApi = {
  create: (collection: Collection) => {
    return db.collections.add(collection);
  },
  update: (id: number, collection: Partial<Collection>) => {
    return db.collections.update(id, collection);
  },
  findAll: () => {
    return db.collections.orderBy("createdAt").toArray();
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
