import type { Icon } from '/@/data/icons';
import type { QueryClient } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import type { Collection, CollectionAction } from '..';
import {
  copyIconToCollection,
  copyToClipboardAsBase64,
  copyToClipboardAsDataURI,
  copyToClipboardAsJsx,
  copyToClipboardAsSvg,
  copyToClipboardFromTemplate,
  deleteIcon,
  moveIconToCollection,
  openInFinder,
  svgoOptimizeIcon
} from './executerFns';

interface FnProps {
  actionObj: CollectionAction;
  icon: Icon | null;
  targetCollection?: Collection;
}

export interface ExecuterProps {
  actionObj: CollectionAction;
  icon: Icon;
  queryClient: QueryClient;
}

const actionExecuters: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [action: string]: (props: any) => Promise<void>;
} = {
  'open-in-finder': openInFinder,
  'delete-icon': deleteIcon,
  'clipboard-copy-template': copyToClipboardFromTemplate,
  'clipboard-copy-svg': copyToClipboardAsSvg,
  'clipboard-copy-jsx': copyToClipboardAsJsx,
  'clipboard-copy-base64': copyToClipboardAsBase64,
  'clipboard-copy-data-uri': copyToClipboardAsDataURI,
  'copy-icon-to-collection': copyIconToCollection,
  'move-icon-to-collection': moveIconToCollection,
  'svgo-optimize': svgoOptimizeIcon
};

export const useOnActionClick = () => {
  const queryClient = useQueryClient();
  const onActionClick = ({ actionObj, icon, ...rest }: FnProps): Promise<void> | null => {
    if (icon) {
      if (actionObj.action in actionExecuters) {
        return actionExecuters[actionObj.action]({
          actionObj,
          icon,
          queryClient,
          ...rest
        });
      }
    }
    return null;
  };

  return onActionClick;
};
