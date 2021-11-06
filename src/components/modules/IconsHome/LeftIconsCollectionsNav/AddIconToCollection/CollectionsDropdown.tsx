import { FC } from 'react';
import { Select } from 'components/ui/atomic-components';
import { CollectionsApi, Collection } from 'data/collections';
import { useQuery } from 'react-query';

interface Props {
  selectedCollection: Collection | null;
  onChange: (collection: Collection) => void;
}

export const CollectionsDropdown: FC<Props> = ({ selectedCollection, onChange }) => {
  const { data: collections } = useQuery('collections', () => CollectionsApi.findAll());

  return (
    <>
      <label className="mb-2 font-medium text-gray-400">Collection to add icons to</label>
      <Select
        className="mb-6"
        selected={selectedCollection}
        options={collections}
        onChange={onChange}
      />
    </>
  );
};
