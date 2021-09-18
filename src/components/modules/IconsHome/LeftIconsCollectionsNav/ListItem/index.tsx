import { FC, ReactNode, useState } from 'react';
import { ReactComponent as OptionsIcon } from 'assets/icons/dots-horizontal.svg';
import { ReactComponent as CollectionIcon } from 'assets/icons/collection.svg';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown } from 'components/ui/atomic-components';
import { Collection, CollectionsApi } from 'data/collections';
import { useQueryClient } from 'react-query';
import { ipcRenderer } from 'electron';
import { DeleteConfirmModal } from 'components/ui/DeleteConfirmModal';
import { OptionsOverlay } from './OptionsOverlay';

interface Props {
  name: string;
  id: string;
  icon?: ReactNode;
  isActive: boolean;
  hideOptions?: boolean;
  collection?: Collection;
  editCollection?: (v?: Collection) => void;
}

export const ListItem: FC<Props> = ({
  name,
  id,
  icon = <CollectionIcon />,
  isActive,
  hideOptions,
  collection,
  editCollection,
}) => {
  const queryClent = useQueryClient();
  const history = useHistory();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const deleteCollection = () => {
    CollectionsApi.delete(id).then(async () => {
      ipcRenderer.send('remove-collection-folder', collection?.folderSrc);
      await queryClent.invalidateQueries('collections-list');
      history.push('/');
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
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div onClick={(e) => e.preventDefault()}>
            <Dropdown
              overlay={
                <OptionsOverlay
                  collection={collection}
                  editCollection={editCollection}
                  onDeleteClick={() => setShowDeleteConfirm(true)}
                />
              }
            >
              <OptionsIcon
                className={`opacity-0 leftnav-list-item-optionsIcon cursor-pointer hover:text-white group-hover:opacity-100 ${
                  isActive ? 'text-white' : ''
                }`}
              />
            </Dropdown>
          </div>
        )}
      </Link>

      <DeleteConfirmModal
        show={showDeleteConfirm}
        title="Are you sure you  want to delete this collection ?"
        onClose={() => setShowDeleteConfirm(false)}
      >
        <p className="text-sm text-gray-500">
          Your payment has been successfully submitted. We’ve sent your an email
          with all of the details of your order.
        </p>
      </DeleteConfirmModal>
    </>
  );
};
