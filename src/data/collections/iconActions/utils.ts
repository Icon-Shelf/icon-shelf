import { Collection } from '..';
import { defaultCollectionActions } from './constants';

export const getIconActionOfCollection = (collection?: Collection) => {
  const actions = collection?.actions;

  if (!actions || !actions.length) {
    return defaultCollectionActions;
  }

  return actions;
};
