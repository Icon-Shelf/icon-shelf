import { Icon } from 'data/icons';
import { QueryClient, useQueryClient } from 'react-query';
import { CollectionAction } from '..';
import {
  openInFinder,
  deleteIcon,
  copyToClipboardFromTemplate,
} from './executerFns';

interface FnProps {
  actionObj: CollectionAction;
  icon: Icon | null;
}

export interface ExecuterProps {
  actionObj: CollectionAction;
  icon: Icon;
  queryClient: QueryClient;
}

const actionExecuters = {
  'open-in-finder': openInFinder,
  'delete-icon': deleteIcon,
  'clipboard-copy-template': copyToClipboardFromTemplate,
};

export const useOnActionClick = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onActionClick = ({ actionObj, icon }: FnProps): any => {
    if (icon) {
      if (actionObj.action in actionExecuters) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return actionExecuters[actionObj.action]({
          actionObj,
          icon,
          queryClient,
        });
      }
    }
  };

  return onActionClick;
};
