import { db } from 'data/db';

export const IconsApi = {
  findAll: async () => {
    const icons = await db.icons.orderBy('updatedAt').toArray();

    return icons;
  },
};
