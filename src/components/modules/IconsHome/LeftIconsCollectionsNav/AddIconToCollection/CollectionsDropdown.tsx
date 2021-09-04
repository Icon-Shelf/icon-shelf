import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Select } from 'components/ui/atomic-components';
import { CollectionsApi, Collection } from 'data/collections';
import { useQuery } from 'react-query';

export const CollectionsDropdown: FC = () => {
  const { collectionId }: { collectionId: string } = useParams();

  const { data: collections } = useQuery('collections', () =>
    CollectionsApi.findAll()
  );

  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const onChange = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  useEffect(() => {
    CollectionsApi.find(parseInt(collectionId))
      .then((collection) => collection && setSelectedCollection(collection))
      .catch(() => {});
  }, [collectionId]);

  return (
    <Select
      className="mb-6"
      selected={selectedCollection}
      options={collections}
      onChange={onChange}
    />
  );
};
