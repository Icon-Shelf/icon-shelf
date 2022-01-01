import { CollectionsApi } from "/@/data/collections";
import type { ExecuterProps } from "../useOnActionClick";

export const openInFinder = async ({ icon }: ExecuterProps) => {
  const collection = await CollectionsApi.find(icon.collectionId);

  if (collection) {
    window.electron.ipcRenderer.send("open-collection-folder-icon", {
      folderSrc: collection?.folderSrc,
      fileName: `${icon.name}.${icon.mime}`,
    });
  }
};
