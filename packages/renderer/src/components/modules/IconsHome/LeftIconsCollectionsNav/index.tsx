import type { FC } from 'react';
import { useState, Fragment } from 'react';
import { ReactComponent as PlusIcon } from '/assets/icons/plus.svg';
import { ReactComponent as ViewGridIcon } from '/assets/icons/view-grid.svg';
import { Button, TitleBarDrag } from '/@/components/ui/atomic-components';
import { useQuery } from 'react-query';
import { CollectionsApi } from '/@/data/collections/api';
import { useParams } from 'react-router-dom';
import type { Collection } from '/@/data/collections';
import Tooltip from 'rc-tooltip';
import { ListItem } from './ListItemWrapper/ListItem';
import { CreateEditCollectionModal } from './CreateEditCollectionModal';
import { CustomizeActionsModal } from './CustomizeActionsModal/index';
import { ListItemWrapper } from './ListItemWrapper';

export const LeftIconsCollectionsNav: FC = () => {
  const { collectionId: selectedCollectionId } = useParams();

  const { data: collections } = useQuery('collections-list', () => CollectionsApi.findAll());

  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  const [selectedCollection, setSelectedCollection] = useState<Collection | null | undefined>(null);

  const editCollection = (collection?: Collection) => {
    setSelectedCollection(collection);
    setShowCollectionModal(true);
  };

  const onCustomizeActionsClick = (collection?: Collection) => {
    setSelectedCollection(collection);
    setShowCustomizeModal(true);
  };

  return (
    <>
      <div className="relative w-64 min-w-max flex-shrink-0 bg-gray-200 dark:bg-black2">
        <TitleBarDrag className="absolute inset-0 h-8" />

        <div className="mx-4 mt-5 flex justify-end">
          <Tooltip placement="left" overlay={<span>Create collection</span>}>
            <Button
              icon={<PlusIcon />}
              type="text"
              id="create-collection-btn"
              onClick={() => editCollection()}
            />
          </Tooltip>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <ListItem
            name="All icons"
            id="all-icons"
            marginLeft={0}
            showChildCollections={false}
            icon={<ViewGridIcon />}
            isActive={selectedCollectionId === 'all-icons'}
            hideOptions
          />
        </div>

        <div className="mt-4">
          <div className="ml-4 text-base">Collections</div>
          <div className="mt-2 flex flex-col gap-2">
            {collections
              ?.filter((c) => !c.parentCollectionId)
              ?.map((collection) => (
                <ListItemWrapper
                  key={collection.id}
                  collection={collection}
                  allCollections={collections}
                  selectedCollectionId={selectedCollectionId}
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
