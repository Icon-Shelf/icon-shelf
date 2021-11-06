import { Collection } from '..';
import { defaultCollectionActions } from './constants';

export const getIconActionOfCollection = (collection?: Collection) => {
  const actions = collection?.actions;

  if (!actions || !actions.length) {
    return defaultCollectionActions;
  }

  return defaultCollectionActions.map((action) => {
    const match = actions.find((item) => item.id === action.id);
    return match || action;
  });
};
