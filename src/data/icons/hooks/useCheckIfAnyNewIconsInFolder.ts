import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { checkIfAnyNewIconsInFolder } from '../utils';
import { useHandleIconInFolderReply } from './useHandleIconInFolderReply';

declare function requestIdleCallback(callback: () => void, options?: { timeout: number }): number;

export const useCheckIfAnyNewIconsInFolder = (collectionId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (collectionId && parseInt(collectionId)) {
      requestIdleCallback(() => checkIfAnyNewIconsInFolder(collectionId), {
        timeout: 5000,
      });
    }
  }, [queryClient, collectionId]);

  useHandleIconInFolderReply();
};
