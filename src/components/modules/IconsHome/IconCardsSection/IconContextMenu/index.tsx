import { FC } from 'react';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-16.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/clipboard-copy-16.svg';
import { ContextMenu } from 'components/ui/atomic-components';
import { useQueryClient } from 'react-query';
import { ReactComponent as ExternalLinkIcon } from 'assets/icons/external-link-16.svg';
import { CollectionsApi } from 'data/collections';
import { IconsApi } from 'data/icons';
import { capitalize, camelCase } from 'lodash';
import { ipcRenderer } from 'electron';
import { useContextMenu } from './hooks/useContextMenu';
import { deleteIcon } from './utils';

export const IconContextMenu: FC = () => {
  const queryClient = useQueryClient();
  const { anchorPoint, clickedIconId } = useContextMenu();

  const onCopy = async () => {
    if (clickedIconId) {
      const selectedIcon = await IconsApi.find(clickedIconId);

      if (selectedIcon) {
        const collection = await CollectionsApi.find(selectedIcon.collectionId);

        const collectionLoc = collection?.folderSrc || '';
        const relativeIconPath = selectedIcon.imageSrc.replace(
          collectionLoc,
          ''
        );

        const copyText = `import { ReactComponent as ${capitalize(
          camelCase(selectedIcon.name.replace(/^ic_/, ''))
        )}Icon } from 'assets${relativeIconPath}';`;

        navigator.clipboard.writeText(copyText);
      }
    }
  };

  const openInFinder = async () => {
    if (clickedIconId) {
      const selectedIcon = await IconsApi.find(clickedIconId);

      if (selectedIcon) {
        const collection = await CollectionsApi.find(selectedIcon.collectionId);

        if (collection) {
          ipcRenderer.send('open-collection-folder-icon', {
            folderSrc: collection?.folderSrc,
            fileName: `${selectedIcon.name}.${selectedIcon.mime}`,
          });
        }
      }
    }
  };

  const onDelete = () => {
    deleteIcon(clickedIconId, queryClient);
  };

  if (!clickedIconId) {
    return <></>;
  }

  return (
    <ContextMenu style={{ top: anchorPoint.y - 65, left: anchorPoint.x - 260 }}>
      <ContextMenu.Item onClick={onCopy}>
        <CopyIcon className="mr-2" />
        <div>Copy as React</div>
      </ContextMenu.Item>

      <ContextMenu.Item onClick={openInFinder}>
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
