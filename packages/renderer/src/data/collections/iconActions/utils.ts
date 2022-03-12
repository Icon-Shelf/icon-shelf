import { keyBy } from 'lodash';
import type { Collection } from '..';
import { defaultCollectionActions } from './constants';

export const getIconActionOfCollection = (collection?: Collection) => {
  const actions = collection?.actions;

  if (!actions || !actions.length) {
    return defaultCollectionActions;
  }

  const storedActionMap = keyBy(actions, 'id');
  return defaultCollectionActions.map((defaultAction) => {
    return storedActionMap[defaultAction.id] || defaultAction;
  });
};
