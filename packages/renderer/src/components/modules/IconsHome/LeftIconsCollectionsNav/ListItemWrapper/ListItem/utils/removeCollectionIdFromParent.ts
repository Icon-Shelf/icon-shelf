import { CollectionsApi } from '/@/data/collections';

export const removeCollectionIdFromParent = async (
  parentCollectionId: number,
  childCollectionId: number
) => {
  const parentCollection = await CollectionsApi.find(parentCollectionId);
  if (parentCollection) {
    const existingChildIds = parentCollection?.childCollectionIds || [];
    parentCollection.childCollectionIds = existingChildIds.filter((id) => id !== childCollectionId);

    return CollectionsApi.update(parentCollectionId, parentCollection);
  }

  Promise.resolve();
};
