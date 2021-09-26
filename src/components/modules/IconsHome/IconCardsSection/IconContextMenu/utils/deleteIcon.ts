import { IconsApi } from 'data/icons';
import { CollectionsApi } from 'data/collections';
import { ipcRenderer } from 'electron';
import { QueryClient } from 'react-query';

export const deleteIcon = async (
  iconId: string | null,
  queryClient: QueryClient
) => {
  if (iconId) {
    const icon = await IconsApi.find(iconId);

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
  }
};
