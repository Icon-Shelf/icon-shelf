import type { Dictionary } from 'lodash';
import type { Collection } from '/@/data/collections';

export const getOrderedCollectionsList = (
  collections: Collection[],
  collectionsMap: Dictionary<Collection>,
  result: Collection[] = []
) => {
  collections.forEach((col) => {
    result.push(col);

    const childCollections: Collection[] = [];
    col.childCollectionIds?.forEach((id) => {
      collectionsMap[id] && childCollections.push(collectionsMap[id]);
    });

    if (childCollections.length) {
      return getOrderedCollectionsList(childCollections, collectionsMap, result);
    }
  });

  return result;
};
