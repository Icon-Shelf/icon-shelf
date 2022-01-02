// import { ReactComponent as HeartIcon } from '/assets/icons/heart.svg';
import type { FC } from 'react';
import { useState } from 'react';
import { ReactComponent as PlusIcon } from '/assets/icons/plus.svg';
import { ReactComponent as ViewGridIcon } from '/assets/icons/view-grid.svg';
import { Button, TitleBarDrag } from '/@/components/ui/atomic-components';
import { useQuery } from 'react-query';
import { CollectionsApi } from '/@/data/collections/api';
import { useParams } from 'react-router-dom';
import type { Collection } from '/@/data/collections';
import Tooltip from 'rc-tooltip';
import { ListItem } from './ListItem';
import { CreateEditCollectionModal } from './CreateEditCollectionModal';
import { CustomizeActionsModal } from './CustomizeActionsModal/index';

export const LeftIconsCollectionsNav: FC = () => {
  const { collectionId: selectedCollectionId } = useParams();

  const { data: collections } = useQuery('collections-list', () => CollectionsApi.findAll());

  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  const [selectedCollection, setSelectedCollection] = useState<Collection | null | undefined>(null);

  const editCollection = (collection?: Collection) => {
    setSelectedCollection(collection);
    setShowCollectionModal((state) => !state);
  };

  const onCustomizeActionsClick = (collection?: Collection) => {
    setSelectedCollection(collection);
    setShowCustomizeModal((state) => !state);
  };

  return (
    <>
      <div className="relative bg-black2 w-64 min-w-max flex-shrink-0">
        <TitleBarDrag className="h-8 absolute inset-0" />

        <div className="flex justify-end mt-5 mx-4">
          <Tooltip placement="left" overlay={<span>Create collection</span>}>
            <Button
              icon={<PlusIcon />}
              type="text"
              id="create-collection-btn"
              onClick={() => editCollection()}
            />
          </Tooltip>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <ListItem
            name="All icons"
            id="all-icons"
            icon={<ViewGridIcon />}
            isActive={selectedCollectionId === 'all-icons'}
            hideOptions
          />
          {/* <ListItem
            name="Fav icons"
            id="fav-icons"
            icon={<HeartIcon />}
            isActive={false}
            hideOptions
          /> */}
        </div>

        <div className="mt-4">
          <div className="ml-4 text-base">Collections</div>
          <div className="flex flex-col gap-2 mt-2">
            {collections?.map((collection) => (
              <ListItem
                key={collection.id}
                name={collection.name}
                id={`${collection.id}`}
                isActive={selectedCollectionId === String(collection.id)}
                collection={collection}
                editCollection={editCollection}
                onCustomizeActionsClick={onCustomizeActionsClick}
              />
            ))}
          </div>
        </div>
      </div>

      <CreateEditCollectionModal
        show={showCollectionModal}
        collection={selectedCollection}
        onClose={() => {
          setShowCollectionModal(false);
          setSelectedCollection(null);
        }}
      />

      <CustomizeActionsModal
        show={showCustomizeModal}
        collection={selectedCollection}
        onClose={() => {
          setShowCustomizeModal(false);
          setSelectedCollection(null);
        }}
      />
    </>
  );
};
