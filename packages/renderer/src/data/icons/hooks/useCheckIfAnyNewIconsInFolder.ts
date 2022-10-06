import { CollectionsApi } from '/@/data/collections';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { checkIfAnyNewIconsInFolder } from '../utils';
import { useHandleIconInFolderReply } from './useHandleIconInFolderReply';

export const useCheckIfAnyNewIconsInFolder = (collectionId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (collectionId && parseInt(collectionId)) {
      requestIdleCallback(() => checkIfAnyNewIconsInFolder(collectionId), {
        timeout: 5000,
      });

      CollectionsApi.find(parseInt(collectionId)).then((collection) => {
        window.electron.ipcRenderer.send('collection-switch', {
          collectionId: collection?.id,
          folderSrc: collection?.folderSrc,
        });
      });
    }
  }, [queryClient, collectionId]);

  useHandleIconInFolderReply();
};
