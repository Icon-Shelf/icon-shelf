import { keyBy } from 'lodash';
import type { Dictionary } from 'lodash';
import type { Collection } from '..';
import type { CollectionAction } from '../types';
import { defaultCollectionActions } from './constants';

export const getIconActionOfCollection = (collection?: Collection) => {
  const actions = collection?.actions;

  if (!actions || !actions.length) {
    return defaultCollectionActions;
  }

  const actionsList: CollectionAction[] = [];
  const allActionsIdMap = keyBy(defaultCollectionActions, 'id');

  actions.forEach((action) => {
    if (allActionsIdMap[action.id]) {
      delete allActionsIdMap[action.id];
    }

    actionsList.push(action);
  });

  for (const key in allActionsIdMap) {
    actionsList.push(allActionsIdMap[key]);
  }

  return actionsList;
};

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

