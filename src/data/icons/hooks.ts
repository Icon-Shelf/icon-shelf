import { checkIfAnyNewIconsInFolder } from 'data/icons';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

declare function requestIdleCallback(callback: () => void, options?: { timeout: number }): number;

export const useCheckIfAnyNewIconsInFolder = (collectionId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (collectionId && parseInt(collectionId)) {
      requestIdleCallback(() => checkIfAnyNewIconsInFolder(collectionId, queryClient), {
        timeout: 3000,
      });
    }
  }, [queryClient, collectionId]);
};
