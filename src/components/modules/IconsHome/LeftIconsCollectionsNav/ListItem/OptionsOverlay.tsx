import { FC } from 'react';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-16.svg';
import { Collection } from 'data/collections';
import { ipcRenderer } from 'electron';
import { ReactComponent as ExternalLinkIcon } from 'assets/icons/external-link-16.svg';
import { Dropdown } from 'components/ui/atomic-components';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { ReactComponent as CursorClickIcon } from 'assets/icons/cursor-click-sm.svg';

export const OptionsOverlay: FC<{
  collection?: Collection;
  onDeleteClick?: () => void;
  editCollection?: (c?: Collection) => void;
}> = ({ collection, editCollection, onDeleteClick }) => {
  const openCollectionFolderInFinder = () => {
    ipcRenderer.send('open-collection-folder', collection?.folderSrc);
  };

  return (
    <>
      <Dropdown.Item onClick={() => editCollection?.(collection)}>
        <PencilIcon className="mr-2" />
        <div>Edit</div>
      </Dropdown.Item>
      <Dropdown.Item onClick={openCollectionFolderInFinder}>
        <ExternalLinkIcon className="mr-2" />
        <div>Open in finder</div>
      </Dropdown.Item>

      {/* <Dropdown.Item onClick={openCollectionFolderInFinder}>
        <CursorClickIcon className="mr-2" />
        <div>Customize actions</div>
      </Dropdown.Item> */}

      <Dropdown.Item onClick={onDeleteClick}>
        <TrashIcon className="mr-2" />
        <div>Delete</div>
      </Dropdown.Item>
    </>
  );
};
