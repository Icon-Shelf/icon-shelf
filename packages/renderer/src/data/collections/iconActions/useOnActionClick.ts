import type { Icon } from "/@/data/icons";
import type { QueryClient} from "react-query";
import { useQueryClient } from "react-query";
import type { CollectionAction } from "..";
import {
  openInFinder,
  deleteIcon,
  copyToClipboardFromTemplate,
  copyToClipboardAsSvg,
  copyToClipboardAsJsx,
} from "./executerFns";

interface FnProps {
  actionObj: CollectionAction;
  icon: Icon | null;
}

export interface ExecuterProps {
  actionObj: CollectionAction;
  icon: Icon;
  queryClient: QueryClient;
}

const actionExecuters: {
  [action: string]: (props: ExecuterProps) => Promise<void>;
} = {
  "open-in-finder": openInFinder,
  "delete-icon": deleteIcon,
  "clipboard-copy-template": copyToClipboardFromTemplate,
  "clipboard-copy-svg": copyToClipboardAsSvg,
  "clipboard-copy-jsx": copyToClipboardAsJsx,
};

export const useOnActionClick = () => {
  const queryClient = useQueryClient();
  const onActionClick = ({
    actionObj,
    icon,
  }: FnProps): Promise<void> | null => {
    if (icon) {
      if (actionObj.action in actionExecuters) {
        return actionExecuters[actionObj.action]({
          actionObj,
          icon,
          queryClient,
        });
      }
    }
    return null;
  };

  return onActionClick;
};
