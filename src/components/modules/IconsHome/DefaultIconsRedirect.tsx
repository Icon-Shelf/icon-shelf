import { FC } from 'react';
import { useQuery } from 'react-query';
import { CollectionsApi } from 'data/collections/api';
import { Redirect } from 'react-router-dom';

export const DefaultIconsRedirect: FC = () => {
  const { data, isFetched } = useQuery('collections-list', () =>
    CollectionsApi.findAll()
  );

  if (isFetched) {
    if (data?.length) {
      return <Redirect to={`/collections/${data[0].id}`} />;
    }
    return <Redirect to="/collections/all-icons" />;
  }

  return <></>;
};
