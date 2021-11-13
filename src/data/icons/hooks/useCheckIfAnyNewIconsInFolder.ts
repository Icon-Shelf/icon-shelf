import { CollectionsApi } from 'data/collections';
import { ipcRenderer } from 'electron';
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

      CollectionsApi.find(parseInt(collectionId)).then((collection) => {
        ipcRenderer.send('collection-switch', {
          collectionId: collection?.id,
          folderSrc: collection?.folderSrc,
        });
      });
    }
  }, [queryClient, collectionId]);

  useHandleIconInFolderReply();
};
