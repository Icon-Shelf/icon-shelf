import { CollectionsApi } from 'data/collections';
import _, { template } from 'lodash';
import { ExecuterProps } from '../useOnActionClick';

export const copyToClipboardFromTemplate = async ({
  icon,
  actionObj,
}: ExecuterProps) => {
  const collection = await CollectionsApi.find(icon.collectionId);

  const collectionLoc = collection?.folderSrc || '';
  const relativeIconPath = icon.imageSrc.replace(collectionLoc, '');

  const compiled = template(actionObj.meta.templateString, { imports: { _ } });

  const copyText = compiled({
    iconName: icon.name,
    iconFileType: icon.mime,
    iconRelativeFilePath: relativeIconPath,
    iconAbsoluteFilePath: icon.imageSrc,
  });

  navigator.clipboard.writeText(copyText);
};
