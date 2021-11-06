import { FC, useState, useEffect } from 'react';
import { Modal, Button } from 'components/ui/atomic-components';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ReactComponent as DocumentIcon } from 'assets/icons/document.svg';
import { Collection, CollectionsApi } from 'data/collections';
import { useParams } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { addIconsToDb2 } from 'data/icons/utils';
import { useQueryClient } from 'react-query';
import { Icon } from 'data/icons';
import { CollectionsDropdown } from './CollectionsDropdown';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const AddIconToCollectionModal: FC<Props> = ({ show, onClose }) => {
  const queryClient = useQueryClient();

  const { collectionId }: { collectionId: string } = useParams();

  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const [uploadedIcons, setUploadedIcons] = useState<ImageListType>([]);

  const onChange = (iconsList: ImageListType) => {
    setUploadedIcons(iconsList);
  };

  const onCollectionChange = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  const onAdd = () => {
    if (uploadedIcons.length && selectedCollection) {
      // add icons to collection folder
      ipcRenderer.send('create-and-add-icon-to-folder', {
        uploadedIcons: uploadedIcons.map((icon) => ({
          dataURL: icon.dataURL,
          fileName: icon.file?.name,
        })),
        folderPath: selectedCollection.folderSrc,
      });

      // add icons to db
      const icons = uploadedIcons
        .filter((icon) => !!icon.file)
        .map((icon) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const [name, type] = icon!.file!.name.split('.');

          return {
            name,
            collectionId,
            mime: type,
            byteSize: icon.file?.size,
            imageSrc: `${selectedCollection.folderSrc.replace(/\/$/, '')}/${icon.file?.name}`,
            createdAt: Date.now(),
            updatedAt: icon.file?.lastModified,
          } as Icon;
        });

      addIconsToDb2(icons, collectionId)
        .then(() => {
          queryClient.invalidateQueries('icons-list');
          onClose();
        })
        .catch(() => {});
    }
  };

  const afterClose = () => {
    setUploadedIcons([]);
  };

  useEffect(() => {
    const parsedCollectionId = parseInt(collectionId);
    if (parsedCollectionId) {
      CollectionsApi.find(parseInt(collectionId)).then(
        (collection) => collection && setSelectedCollection(collection)
      );
    }
  }, [collectionId]);

  return (
    <Modal
      show={show}
      title="Add icons to collection"
      onClose={onClose}
      className="w-96"
      afterClose={afterClose}
      footer={
        <Button type="primary" onClick={onAdd}>
          Add
        </Button>
      }
    >
      <div>
        <CollectionsDropdown
          selectedCollection={selectedCollection}
          onChange={onCollectionChange}
        />

        <ImageUploading multiple value={uploadedIcons} onChange={onChange} maxNumber={69}>
          {({ imageList, onImageUpload, isDragging, dragProps }) => (
            <div
              className={`w-full flex flex-col items-center justify-center outline-none border-2 border-gray-500 border-dashed rounded-md py-14 hover:border-gray-400 ${
                isDragging && 'border-primary'
              }`}
              onClick={onImageUpload}
              role="button"
              onKeyDown={() => {}}
              tabIndex={-1}
              {...dragProps}
            >
              {!imageList.length && <UploadIcon className="pointer-events-none" />}

              {imageList.length > 0 && (
                <div className="flex items-center gap-1">
                  <DocumentIcon className="pointer-events-none" />
                  <span className="text-white text-lg">
                    {imageList.length} {imageList.length === 1 ? 'icon' : 'icons'} chosen
                  </span>
                </div>
              )}

              {!imageList.length && (
                <div className="flex flex-col items-center pointer-events-none">
                  <span className="text-sm text-white">Drag and drop your icons here</span>

                  <button className="text-xs hover:text-white focus:text-white" type="button">
                    or click to browse your files
                  </button>
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
    </Modal>
  );
};
