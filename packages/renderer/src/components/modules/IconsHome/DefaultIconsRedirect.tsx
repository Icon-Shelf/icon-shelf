import type { FC } from 'react';

import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { CollectionsApi } from '/@/data/collections';

export const DefaultIconsRedirect: FC = () => {
  const { data, isFetched } = useQuery('collections-list', () => CollectionsApi.findAll());

  if (isFetched) {
    if (data?.length) {
      return <Navigate to={`/collections/${data[0].id}`} />;
    }
    return <Navigate to="/collections/all-icons" />;
  }

  return <></>;
};
