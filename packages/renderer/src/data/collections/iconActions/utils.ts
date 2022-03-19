import { keyBy } from 'lodash';
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
