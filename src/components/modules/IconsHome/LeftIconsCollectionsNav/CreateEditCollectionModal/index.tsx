import { FC, useState } from 'react';
import { Input, Modal, Button } from 'components/ui/atomic-components';
import { ipcRenderer } from 'electron';
import { Collection } from 'data/collections';
import { CollectionsApi } from 'data/collections/api';

const { FolderInput } = Input;

interface Props {
  show: boolean;
  onClose: () => void;
}

export const CreateEditCollectionModal: FC<Props> = ({ show, onClose }) => {
  const [collectionName, setCollectionName] = useState('');

  const [folderLoc, setFolderLoc] = useState(
    ipcRenderer.sendSync('get-default-icon-storage-folder')
  );

  const onCreate = () => {
    const collection: Collection = {
      name: collectionName,
      folderSrc: folderLoc,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return CollectionsApi.create(collection).then(() => onClose());
  };

  return (
    <Modal
      show={show}
      title="Create a new collection"
      onClose={onClose}
      className="w-52"
      footer={
        <Button type="primary" onClick={onCreate}>
          Create
        </Button>
      }
    >
      <div>
        <label>
          <div className="mb-2 font-medium text-gray-400">
            Enter a name for the collection
          </div>
          <Input
            id="collection-name"
            className="mb-6"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </label>

        <label>
          <div className="mb-2 font-medium text-gray-400 focus-within:text-white">
            Icons in collection will be stored in
          </div>

          <FolderInput
            folderPath={folderLoc}
            onChange={(path) => setFolderLoc(path)}
          />
        </label>
      </div>
    </Modal>
  );
};
