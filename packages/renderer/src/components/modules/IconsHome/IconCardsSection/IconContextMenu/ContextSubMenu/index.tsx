import type { FC } from 'react';
import { useQuery } from 'react-query';
import { ContextMenu } from '/@/components/ui/atomic-components';
import type { CollectionAction } from '/@/data/collections';
import { CollectionsApi } from '/@/data/collections';

interface Props {
  action: CollectionAction;
}

export const ContextSubMenu: FC<Props> = (action) => {
  const { data: collections } = useQuery('collections-list', () => CollectionsApi.findAll());

  return (
    <div className="mt-0 flex max-h-44 w-44 flex-col overflow-auto rounded-md rounded-tl-none border bg-gray-600 shadow-lg">
      {collections?.map((collection) => (
        <ContextMenu.Item key={collection.id}>{collection.name}</ContextMenu.Item>
      ))}
    </div>
  );
};
