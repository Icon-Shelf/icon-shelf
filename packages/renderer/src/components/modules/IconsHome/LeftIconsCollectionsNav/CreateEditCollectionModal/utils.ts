import { CollectionsApi } from '/@/data/collections';

export const updateParentCollectionWithChildId = async (
  parentCollectionId: number,
  childCollectionId: number
) => {
  const parentCollection = await CollectionsApi.find(parentCollectionId);
  if (parentCollection) {
    const existingChildIds = parentCollection?.childCollectionIds || [];
    parentCollection.childCollectionIds = existingChildIds.concat(childCollectionId);

    return CollectionsApi.update(parentCollectionId, parentCollection);
  }

  Promise.resolve();
};
