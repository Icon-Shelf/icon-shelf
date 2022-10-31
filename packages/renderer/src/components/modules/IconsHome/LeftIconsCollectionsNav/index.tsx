import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import { ReactComponent as PlusIcon } from '/assets/icons/plus.svg';
import { ReactComponent as ViewGridIcon } from '/assets/icons/view-grid.svg';
import { Button, TitleBarDrag } from '/@/components/ui/atomic-components';
import { useQuery } from '@tanstack/react-query';
import { CollectionsApi } from '/@/data/collections/api';
import { useParams } from 'react-router-dom';
import type { Collection } from '/@/data/collections';
import Tooltip from 'rc-tooltip';
import { ListItem } from './ListItemWrapper/ListItem';
import { CreateEditCollectionModal } from './CreateEditCollectionModal';
import { CustomizeActionsModal } from './CustomizeActionsModal/index';
import { ListItemWrapper } from './ListItemWrapper';
import { Resizable } from 're-resizable';

interface Props extends PropsWithChildren {
  onSortClick: () => void;
}
export const LeftIconsCollectionsNav: FC<Props> = ({ onSortClick }) => {
  const { collectionId: selectedCollectionId } = useParams();

  const { data: collections } = useQuery(['collections-list'], () => CollectionsApi.findAll());

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
      <Resizable
        size={{ width: '16rem', height: 'auto' }}
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        minWidth="256px"
        maxWidth="320px"
        className="relative flex-shrink-0 w-64 h-full bg-gray-200 min-w-max dark:bg-black2"
      >
        <TitleBarDrag className="absolute inset-0 h-8" />

        <div className="flex justify-end mx-4 mt-5">
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
            marginLeft={0}
            showChildCollections={false}
            icon={<ViewGridIcon />}
            isActive={selectedCollectionId === 'all-icons'}
            hideOptions
            onSortClick={onSortClick}
          />
        </div>

        <div className="h-full mt-4">
          <div className="ml-4 text-base">Collections</div>
          <div
            className="flex flex-col gap-2 pb-24 mt-2 overflow-auto"
            style={{ height: 'calc(100% - 120px)' }}
          >
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
                  onSortClick={onSortClick}
                />
              ))}
          </div>
        </div>
      </Resizable>

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
