import type { FC } from 'react';
import { ReactComponent as TrashIcon } from '/assets/icons/trash-16.svg';
import type { Collection } from '/@/data/collections';
import { ReactComponent as ExternalLinkIcon } from '/assets/icons/external-link-16.svg';
import { Dropdown } from '/@/components/ui/atomic-components';
import { ReactComponent as PencilIcon } from '/assets/icons/pencil.svg';
import { ReactComponent as CursorClickIcon } from '/assets/icons/cursor-click-sm.svg';
import { platformBasedText } from '/@/utils/platformText';

export const OptionsOverlay: FC<{
  collection?: Collection;
  onDeleteClick?: () => void;
  editCollection?: (c?: Collection) => void;
  onCustomizeActionsClick?: (c?: Collection) => void;
}> = ({ collection, editCollection, onDeleteClick, onCustomizeActionsClick }) => {
  const openCollectionFolderInFinder = () => {
    window.electron.ipcRenderer.send('open-collection-folder', collection?.folderSrc);
  };

  return (
    <>
      <Dropdown.Item onClick={() => editCollection?.(collection)}>
        <PencilIcon className="mr-2" />
        <div>Edit</div>
      </Dropdown.Item>
      <Dropdown.Item onClick={openCollectionFolderInFinder}>
        <ExternalLinkIcon className="mr-2" />
        <div>
          {platformBasedText({
            mac: 'Open in finder',
            win: 'Open in explorer',
            linux: 'Open in file manager',
          })}
        </div>
      </Dropdown.Item>

      <Dropdown.Item onClick={() => onCustomizeActionsClick?.(collection)}>
        <CursorClickIcon className="mr-2" />
        <div>Customize actions</div>
      </Dropdown.Item>

      <Dropdown.Item onClick={onDeleteClick}>
        <TrashIcon className="mr-2" />
        <div>Delete</div>
      </Dropdown.Item>
    </>
  );
};
