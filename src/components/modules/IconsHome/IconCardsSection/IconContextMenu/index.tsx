import { FC } from 'react';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-16.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/clipboard-copy.svg';
import { ContextMenu } from 'components/ui/atomic-components';
import { useQueryClient } from 'react-query';
import { ReactComponent as ExternalLinkIcon } from 'assets/icons/external-link-16.svg';
import { useContextMenu } from './hooks/useContextMenu';
import { deleteIcon } from './utils';

export const IconContextMenu: FC = () => {
  const queryClient = useQueryClient();
  const { anchorPoint, clickedIconId } = useContextMenu();

  const onDelete = () => {
    deleteIcon(clickedIconId, queryClient);
  };

  if (!clickedIconId) {
    return <></>;
  }

  return (
    <ContextMenu style={{ top: anchorPoint.y - 65, left: anchorPoint.x - 260 }}>
      <ContextMenu.Item>
        <CopyIcon className="mr-2" />
        <div>Copy as React</div>
      </ContextMenu.Item>

      <ContextMenu.Item>
        <ExternalLinkIcon className="mr-2" />
        <div>Open in finder</div>
      </ContextMenu.Item>

      <ContextMenu.Item onClick={onDelete}>
        <TrashIcon className="mr-2" />
        <div>Delete</div>
      </ContextMenu.Item>
    </ContextMenu>
  );
};
