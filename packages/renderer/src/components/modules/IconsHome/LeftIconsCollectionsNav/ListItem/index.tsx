import type { FC, ReactNode } from 'react';
import { useState, useRef } from 'react';
import { ReactComponent as OptionsIcon } from '/assets/icons/dots-horizontal.svg';
import { ReactComponent as CollectionIcon } from '/assets/icons/collection.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Dropdown } from '/@/components/ui/atomic-components';
import type { Collection } from '/@/data/collections';
import { CollectionsApi } from '/@/data/collections';
import { useQueryClient } from 'react-query';
import { DeleteConfirmModal } from '/@/components/ui/DeleteConfirmModal';
import { OptionsOverlay } from './OptionsOverlay';

interface Props {
  name: string;
  id: string;
  icon?: ReactNode;
  isActive: boolean;
  hideOptions?: boolean;
  collection?: Collection;
  editCollection?: (v?: Collection) => void;
  onCustomizeActionsClick?: (v?: Collection) => void;
}

export const ListItem: FC<Props> = ({
  name,
  id,
  icon = <CollectionIcon />,
  isActive,
  hideOptions,
  collection,
  editCollection,
  onCustomizeActionsClick,
}) => {
  const queryClent = useQueryClient();
  const navigate = useNavigate();

  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteFolderFromFileSystem = useRef(false);

  const deleteCollection = () => {
    CollectionsApi.delete(id).then(async () => {
      await queryClent.invalidateQueries('collections-list');
      navigate('/');

      if (deleteFolderFromFileSystem.current) {
        window.electron.ipcRenderer.send('remove-collection-folder', collection?.folderSrc);
      }
    });
  };

  return (
    <>
      <Link
        to={`/collections/${id}`}
        className={`group flex justify-between items-center px-4 py-1 hover:bg-gray-800 ${
          isActive && 'bg-primary hover:bg-primary'
        }`}
      >
        <div className="flex gap-2 text-white cursor-default">
          {icon}
          {name}
        </div>

        {!hideOptions && (
          <div onClick={(e) => e.preventDefault()}>
            <Dropdown
              overlay={
                <OptionsOverlay
                  collection={collection}
                  editCollection={editCollection}
                  onCustomizeActionsClick={onCustomizeActionsClick}
                  onDeleteClick={() => setShowDeleteConfirm(true)}
                />
              }
              onMenuButtonClick={(opened) => setDropdownIsVisible(opened)}
            >
              <OptionsIcon
                className={`leftnav-list-item-optionsIcon cursor-pointer hover:text-white group-hover:opacity-100
                ${isActive ? 'text-white' : ''}
                ${dropdownIsVisible ? 'opacity-100' : 'opacity-0'}`}
              />
            </Dropdown>
          </div>
        )}
      </Link>

      <DeleteConfirmModal
        show={showDeleteConfirm}
        title="Are you sure you  want to delete this collection ?"
        onClose={() => setShowDeleteConfirm(false)}
        onSubmit={deleteCollection}
      >
        <p className="text-sm text-gray-500">
          This will delete the collection and icons in it from the icon shelf records.
        </p>
        <div className="mt-3 mb-8">
          <Checkbox
            label="remove collection folder from file system as well"
            onChange={(val) => {
              deleteFolderFromFileSystem.current = val;
            }}
          />
        </div>
      </DeleteConfirmModal>
    </>
  );
};
