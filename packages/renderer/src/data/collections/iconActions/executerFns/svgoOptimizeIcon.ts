import { CollectionsApi } from '/@/data/collections';
import type { ExecuterProps } from '../useOnActionClick';
import { getSvgoPreference } from '/@/components/ui/PreferenceModal/utils';

export const svgoOptimizeIcon = async ({ icon, queryClient }: ExecuterProps) => {
  if (icon && icon.id && icon.collectionId) {
    const collection = await CollectionsApi.find(icon.collectionId);
    const svgoSettings = getSvgoPreference().options;

    window.electron.ipcRenderer.send('svg-optimize-icon', {
      folderSrc: collection?.folderSrc,
      fileName: `${icon.name}.${icon.mime}`,
      svgoSettings,
    });

    setTimeout(() => {
      window.electron.ipcRenderer.send('send-notification', {
        title: 'icon optimized',
      });

      queryClient.resetQueries(['icons-list', String(icon.collectionId)]);
    }, 500);
  }
};
