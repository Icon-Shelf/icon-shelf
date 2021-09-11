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

    try {
      const icons = await db.icons
        .where('collectionId')
        .equals(collectionId)
        .reverse()
        .sortBy('updatedAt');

      return icons || [];
    } catch {
      return [];
    }
  },

  delete: (iconId: number) => {
    return db.icons.delete(iconId);
  },
};
