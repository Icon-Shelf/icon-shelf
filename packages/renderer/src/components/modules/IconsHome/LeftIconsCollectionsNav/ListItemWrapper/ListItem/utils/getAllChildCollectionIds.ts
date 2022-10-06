import type { QueryClient } from '@tanstack/react-query';
import type { Collection } from '/@/data/collections';

export const getAllChildCollectionIds = (collectionId: number, queryClient: QueryClient) => {
  const allCollections = queryClient.getQueryData<Collection[]>(['collections-list']) || [];

  const deepChildColIds = getChildCollectionIds(collectionId, allCollections);

  return deepChildColIds;
};

const getChildCollectionIds = (
  collectionId: number,
  allCollections: Collection[],
  deepChildColIds: number[] = []
) => {
  const collection = allCollections.find((c) => c.id === collectionId);

  collection?.childCollectionIds?.forEach((id) => {
    deepChildColIds.push(id);

    return getChildCollectionIds(id, allCollections, deepChildColIds);
  });

  return deepChildColIds;
};
