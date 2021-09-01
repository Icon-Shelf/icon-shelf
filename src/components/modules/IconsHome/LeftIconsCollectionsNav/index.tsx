import { FC, useState } from 'react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as ViewGridIcon } from 'assets/icons/view-grid.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { Button } from 'components/ui/atomic-components';
import { db } from 'data/db';
import { useQuery } from 'react-query';
import { CollectionsApi } from 'data/collections/api';
import { useParams } from 'react-router-dom';
import { ListItem } from './ListItem';
import { CreateEditCollectionModal } from './CreateEditCollectionModal';

export const LeftIconsCollectionsNav: FC = () => {
  const { collectionId: selectedCollectionId }: { collectionId: string } =
    useParams();

  const { data: collections } = useQuery('collections', () =>
    CollectionsApi.findAll()
  );

  const [showCollectionModal, setShowCollectionModal] = useState(false);

  const toggleCollectionsModal = () => {
    setShowCollectionModal((state) => !state);
  };

  return (
    <>
      <div className="bg-black2 w-64 min-w-max flex-shrink-0">
        <div className="flex justify-end mt-5 mx-4">
          <Button
            icon={<PlusIcon />}
            type="text"
            onClick={toggleCollectionsModal}
          />
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <ListItem
            name="All icons"
            id={'all-icons'}
            icon={<ViewGridIcon />}
            isActive={false}
          />
          <ListItem
            name="All icons"
            id={'fav-icons'}
            icon={<HeartIcon />}
            isActive={false}
          />
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
              />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Button
            onClick={() => {
              db.icons.clear();
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <CreateEditCollectionModal
        show={showCollectionModal}
        onClose={toggleCollectionsModal}
      />
    </>
  );
};
