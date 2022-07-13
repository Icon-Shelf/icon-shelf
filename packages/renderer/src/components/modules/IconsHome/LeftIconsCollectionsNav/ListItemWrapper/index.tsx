import type { FC } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { ListItem } from './ListItem';
import type { Collection } from '/@/data/collections';

interface Props {
  collection: Collection;
  allCollections: Collection[];
  selectedCollectionId?: string;
  marginLeft?: number;
  editCollection?: (v?: Collection) => void;
  onCustomizeActionsClick?: (v?: Collection) => void;
}
export const ListItemWrapper: FC<React.PropsWithChildren<Props>> = ({
  collection,
  allCollections,
  selectedCollectionId,
  marginLeft = 0,
  editCollection,
  onCustomizeActionsClick,
}) => {
  const [showChildCollections, setShowChildCollections] = useState(
    !!collection?.childCollectionIds?.length
  );

  const onShowChildCollectionsToggle = (v: boolean) => {
    setShowChildCollections(v);
  };

  return (
    <Fragment key={collection.id}>
      <ListItem
        name={collection.name}
        id={`${collection.id}`}
        marginLeft={marginLeft}
        isActive={selectedCollectionId === String(collection.id)}
        collection={collection}
        editCollection={editCollection}
        onCustomizeActionsClick={onCustomizeActionsClick}
        showChildCollections={showChildCollections}
        onShowChildCollectionsToggle={onShowChildCollectionsToggle}
      />

      {showChildCollections &&
        collection.childCollectionIds?.map((cId) => {
          const collection = allCollections?.find((c) => c.id === cId);

          return (
            collection && (
              <ListItemWrapper
                key={collection.id}
                marginLeft={marginLeft + (collection.childCollectionIds?.length ? 10 : 30)}
                collection={collection}
                allCollections={allCollections}
                selectedCollectionId={selectedCollectionId}
                editCollection={editCollection}
                onCustomizeActionsClick={onCustomizeActionsClick}
              />
            )
          );
        })}
    </Fragment>
  );
};
