import { useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { checkIfAnyNewIconsInFolder, handleIconInFolderReply } from '../utils';

export const useHandleIconInFolderReply = () => {
  const queryClient = useQueryClient();

  const handleIconInFolderReplyFn = useCallback(
    (
      files: {
        name: string;
        imageSrc: string;
        byteSize: number;
        createdAt: number;
        updatedAt: number;
      }[],
      collectionIdNo: number
    ) => {
      handleIconInFolderReply(queryClient, files, collectionIdNo);
    },
    [queryClient]
  );

  const handleFolderChangeReply = useCallback((collectionId) => {
    checkIfAnyNewIconsInFolder(collectionId);
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on('get-all-icon-in-folder_reply', handleIconInFolderReplyFn);
    window.electron.ipcRenderer.on('collection-folder-change_reply', handleFolderChangeReply);

    return () => {
      window.electron.ipcRenderer.removeListener(
        'get-all-icon-in-folder_reply',
        handleIconInFolderReplyFn
      );
    };
  }, [queryClient, handleIconInFolderReplyFn, handleFolderChangeReply]);
};
