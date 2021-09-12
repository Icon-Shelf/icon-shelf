import { checkIfAnyNewIconsInFolder } from 'data/icons';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

export const useCheckIfAnyNewIconsInFolder = (collectionId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (collectionId && parseInt(collectionId)) {
      checkIfAnyNewIconsInFolder(collectionId, queryClient);
    }
  }, [queryClient, collectionId]);
};
