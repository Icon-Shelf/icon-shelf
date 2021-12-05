import { CollectionsApi } from 'data/collections';
import { IconsApi } from 'data/icons';
import { ipcRenderer } from 'electron';
import { ExecuterProps } from '../useOnActionClick';

export const deleteIcon = async ({ icon, queryClient }: ExecuterProps) => {
  if (icon && icon.id) {
    IconsApi.delete(icon.id as number)
      .then(() => {
        queryClient.invalidateQueries(['icons-list', icon.collectionId]);
      })
      .then(async () => {
        if (icon.collectionId) {
          const collection = await CollectionsApi.find(icon.collectionId);

          ipcRenderer.send('remove-icon-from-folder', {
            folderSrc: collection?.folderSrc,
            fileName: `${icon.name}.${icon.mime}`,
          });
        }
      })
      .catch(() => {});
  }
};
