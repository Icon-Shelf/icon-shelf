import { db } from 'data/db';
import { Icon } from './types';

const filterIconsBasedOnSearch = (icons: Icon[], searchQuery = '') => {
  return icons.filter((icon) => icon.name.includes(searchQuery));
};

export const IconsApi = {
  findAll: async () => {
    const icons = await db.icons.orderBy('updatedAt').toArray();

    return icons;
  },

  findAllInCollection: async (collectionId: string, searchQuery?: string) => {
    if (!collectionId) {
      return [];
    }

    if (collectionId === 'all-icons') {
      const icons = await db.icons
        .orderBy('collectionId')
        .reverse()
        .sortBy('updatedAt');

      return filterIconsBasedOnSearch(icons, searchQuery) || [];
    }

    const icons = await db.icons
      .where('collectionId')
      .equals(collectionId)
      .reverse()
      .sortBy('updatedAt');

    return filterIconsBasedOnSearch(icons, searchQuery) || [];
  },

  delete: (iconId: number) => {
    return db.icons.delete(iconId);
  },
};
