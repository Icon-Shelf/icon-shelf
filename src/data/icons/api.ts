import { db } from 'data/db';

export const IconsApi = {
  findAll: async () => {
    const icons = await db.icons.orderBy('updatedAt').toArray();

    return icons;
  },

  findAllInCollection: async (collectionId: string) => {
    if (!collectionId) {
      return [];
    }

    if (collectionId === 'all-icons') {
      const icons = await db.icons.orderBy('updatedAt').toArray();

      return icons || [];
    }

    const icons = await db.icons
      .where('collectionId')
      .equals(collectionId)
      .reverse()
      .sortBy('updatedAt');

    return icons || [];
  },

  delete: (iconId: number) => {
    return db.icons.delete(iconId);
  },
};
