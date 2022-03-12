import type { Dictionary } from 'lodash';
import type { Collection } from '/@/data/collections';

export const constructCollectionName = (
  collection: Collection,
  collectionsMap: Dictionary<Collection>
): string => {
  if (collection.parentCollectionId) {
    const parentCollection = collectionsMap[collection.parentCollectionId];

    if (parentCollection) {
      return constructCollectionName(parentCollection, collectionsMap) + '/' + collection.name;
    } else {
      return collection.name;
    }
  } else {
    return collection.name;
  }
};
