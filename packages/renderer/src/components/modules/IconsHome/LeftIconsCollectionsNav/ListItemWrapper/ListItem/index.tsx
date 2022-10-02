import type { FC, ReactNode } from 'react';
import { useState, useRef } from 'react';
import { ReactComponent as OptionsIcon } from '/assets/icons/dots-horizontal.svg';
import { ReactComponent as CollectionIcon } from '/assets/icons/collection-16.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Dropdown, ExpandCollapseArrow } from '/@/components/ui/atomic-components';
import type { Collection } from '/@/data/collections';
import { CollectionsApi } from '/@/data/collections';
import { useQueryClient } from 'react-query';
import { DeleteConfirmModal } from '/@/components/ui/DeleteConfirmModal';
import { OptionsOverlay } from './OptionsOverlay';
import { removeCollectionIdFromParent } from './utils/removeCollectionIdFromParent';
import { getAllChildCollectionIds } from './utils/getAllChildCollectionIds';

interface Props {
  name: string;
  id: string;
  icon?: ReactNode;
  isActive: boolean;
  hideOptions?: boolean;
  collection?: Collection;
  showChildCollections: boolean;
  marginLeft: number;
  onShowChildCollectionsToggle?: (v: boolean) => void;
  editCollection?: (v?: Collection) => void;
  onCustomizeActionsClick?: (v?: Collection) => void;
}

export const ListItem: FC<React.PropsWithChildren<Props>> = ({
  name,
  id,
  icon = <CollectionIcon className="overflow-visible" />,
  isActive,
  hideOptions,
  collection,
  showChildCollections,
  marginLeft,
  onShowChildCollectionsToggle,
  editCollection,
  onCustomizeActionsClick,
}) => {
  const queryClent = useQueryClient();
  const navigate = useNavigate();

  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteFolderFromFileSystem = useRef(false);

  const deleteCollection = async () => {
    const parentCollectionId = collection?.parentCollectionId;
    const collectionId = collection?.id;

    CollectionsApi.delete(id).then(async () => {
      if (parentCollectionId && collectionId) {
        await removeCollectionIdFromParent(parentCollectionId, collectionId);
      } else if (collectionId && collection.childCollectionIds?.length) {
        const childCollectionIds = getAllChildCollectionIds(collectionId, queryClent);
        Promise.all(childCollectionIds.map((cId) => CollectionsApi.delete(cId)));
      }

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
        className={`group flex  items-center justify-between  px-4 py-1 ${
          isActive ? 'bg-primary hover:bg-primary' : 'hover:bg-gray-300 hover:dark:bg-gray-800'
        }`}
      >
        <div
          className={`flex cursor-default items-center gap-2 overflow-hidden text-ellipsis dark:text-white	 ${
            isActive ? 'text-white' : 'text-black'
          }`}
          style={{ marginLeft: marginLeft }}
        >
          {!!collection?.childCollectionIds?.length && (
            <ExpandCollapseArrow
              isOpen={showChildCollections}
              onChange={onShowChildCollectionsToggle}
            />
          )}
          {icon}
          <div className="w-full truncate">{name}</div>
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
                className={`leftnav-list-item-optionsIcon cursor-pointer group-hover:opacity-100 hover:dark:text-white
                ${isActive ? 'text-white hover:text-white' : 'hover:text-black'}
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
        <p className="text-sm text-body">
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
