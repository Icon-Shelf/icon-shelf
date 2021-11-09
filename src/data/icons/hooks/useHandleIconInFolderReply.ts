import { ipcRenderer, IpcRendererEvent } from 'electron';
import { useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { handleIconInFolderReply } from '../utils';

export const useHandleIconInFolderReply = () => {
  const queryClient = useQueryClient();

  const handleIconInFolderReplyFn = useCallback(
    (
      _: IpcRendererEvent,
      files: {
        name: string;
        imageSrc: string;
        byteSize: number;
        createdAt: number;
        updatedAt: number;
      }[],
      collectionIdNo: number
    ) => handleIconInFolderReply(queryClient, _, files, collectionIdNo),
    [queryClient]
  );

  useEffect(() => {
    ipcRenderer.on('get-all-icon-in-folder_reply', handleIconInFolderReplyFn);

    return () => {
      ipcRenderer.removeListener('get-all-icon-in-folder_reply', handleIconInFolderReplyFn);
    };
  }, [queryClient, handleIconInFolderReplyFn]);
};
