import { ipcRenderer, IpcRendererEvent } from 'electron';
import { useEffect, useCallback } from 'react';
import { IconsApi } from 'data/icons';
import { useQueryClient } from 'react-query';
import { CollectionsApi } from 'data/collections';

export const useRegisterIpcRendererCallbacks = (
  currentCollectionId: string
) => {
  const queryClient = useQueryClient();

  const deleteIconCallback = useCallback(
    (
      _: IpcRendererEvent,
      {
        iconId,
        fileName,
        collectionId,
      }: { iconId: number; fileName: string; collectionId: string }
    ) => {
      if (iconId) {
        IconsApi.delete(iconId)
          .then(() => {
            queryClient.invalidateQueries(['icons-list', currentCollectionId]);
          })
          .then(async () => {
            if (collectionId) {
              const collection = await CollectionsApi.find(collectionId);
              ipcRenderer.send('remove-icon-from-folder', {
                folderSrc: collection?.folderSrc,
                fileName,
              });
            }
          })
          .catch(() => {});
      }
    },
    [currentCollectionId, queryClient]
  );

  useEffect(() => {
    ipcRenderer.on('icon-show-context-menu_delete', deleteIconCallback);

    return () => {
      ipcRenderer.removeListener(
        'icon-show-context-menu_delete',
        deleteIconCallback
      );
    };
  }, [deleteIconCallback]);
};
