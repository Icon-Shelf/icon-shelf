import { ipcRenderer, IpcRendererEvent } from 'electron';
import { useEffect, useCallback } from 'react';
import { IconsApi } from 'data/icons';
import { useQueryClient } from 'react-query';
import { CollectionsApi } from 'data/collections';

export const useRegisterIpcRendererCallbacks = (collectionId: string) => {
  const queryClient = useQueryClient();

  const deleteIconCallback = useCallback(
    (
      _: IpcRendererEvent,
      { iconId, fileName }: { iconId: number; fileName: string }
    ) => {
      if (iconId) {
        IconsApi.delete(iconId)
          .then(() => {
            queryClient.invalidateQueries(['icons-list', collectionId]);
          })
          .then(async () => {
            const collection = await CollectionsApi.find(collectionId);
            ipcRenderer.send('remove-icon-from-folder', {
              folderSrc: collection?.folderSrc,
              fileName,
            });
          })
          .catch(() => {});
      }
    },
    [collectionId, queryClient]
  );

  useEffect(() => {
    ipcRenderer.on('icon-show-context-menu_delete', deleteIconCallback);

    return () => {
      ipcRenderer.removeListener(
        'icon-show-context-menu_delete',
        deleteIconCallback
      );
    };
  });
};
