import { db } from '../db';
import type { Icon } from './types';

// const LIMIT = 100;

export const IconsApi = {
  findAll: async () => {
    const icons = await db.icons.orderBy('updatedAt').toArray();

    return icons;
  },

  find: (id: number | string) => {
    const parsedId: number = parseInt(id as string);

    return db.icons.get(parsedId);
  },

  delete: (iconId: number) => {
    return db.icons.delete(iconId);
  },

  getAllIconsInCollection: async ({ collectionId }: { collectionId: string }): Promise<Icon[]> => {
    if (!collectionId) {
      return Promise.resolve([]);
    }

    let icons = [];
    if (collectionId === 'all-icons') {
      icons = await db.icons.toArray();
    }

    icons = await db.icons.where('collectionId').equals(collectionId).toArray();

    return icons || [];
  },

  getIconsInCollection: async ({
    collectionId,
    searchQuery,
    isSortedByNameDesc,
  }: {
    collectionId: string;
    searchQuery?: string;
    isSortedByNameDesc?: boolean;
  }): Promise<{
    data: Icon[];
  }> => {
    if (!collectionId) {
      return Promise.resolve({
        data: [],
      });
    }

    if (collectionId === 'all-icons') {
      const data = await db.icons
        .orderBy('collectionId')
        .filter((icon) => {
          return icon.name.toLowerCase().includes((searchQuery || '').toLocaleLowerCase());
        })
        // .offset(LIMIT * pageParam)
        // .limit(LIMIT)
        .reverse()
        .sortBy('updatedAt') || []

      return { data };
    }

    let iconsQuery;
    const iconsCollection = db.icons
      .where('collectionId')
      .equals(collectionId)
      .filter((icon) => {
        return icon.name.toLowerCase().includes((searchQuery || '').toLocaleLowerCase());
      });

    if (isSortedByNameDesc) {
      iconsQuery = iconsCollection.reverse().sortBy('name');
    } else if (isSortedByNameDesc === false) {
      iconsQuery = iconsCollection.sortBy('name');
    } else {
      iconsQuery = iconsCollection.reverse().sortBy('updatedAt');
    }

    const data = await iconsQuery || []

    return { data };
  },
};
