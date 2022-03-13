import { db } from '../db';
import type { Icon } from './types';

const LIMIT = 100;

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
    pageParam = 0,
  }: {
    collectionId: string;
    searchQuery?: string;
    pageParam?: number;
  }): Promise<{
    data: Icon[];
    nextPage?: number | undefined;
  }> => {
    if (!collectionId) {
      return Promise.resolve({
        data: [],
      });
    }

    let icons = [];
    if (collectionId === 'all-icons') {
      icons = await db.icons
        .orderBy('collectionId')
        .filter((icon) => icon.name.toLowerCase().includes((searchQuery || '').toLocaleLowerCase()))
        .offset(LIMIT * pageParam)
        .limit(LIMIT)
        .reverse()
        .sortBy('updatedAt');
    }

    icons = await db.icons
      .where('collectionId')
      .equals(collectionId)
      .filter((icon) => icon.name.toLowerCase().includes((searchQuery || '').toLocaleLowerCase()))
      .offset(LIMIT * pageParam)
      .limit(LIMIT)
      .reverse()
      .sortBy('updatedAt');

    const nextPage = icons.length === LIMIT ? pageParam + 1 : undefined;

    return {
      data: icons || [],
      nextPage,
    };
  },
};
