import { FC, useState, useEffect } from 'react';
import { Input, Modal, Button } from 'components/ui/atomic-components';
import { ipcRenderer } from 'electron';
import { Collection } from 'data/collections';
import { CollectionsApi } from 'data/collections/api';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

const { FolderInput } = Input;

function uuidv4() {
  return 'xxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface Props {
  show: boolean;
  collection?: Collection | null;
  onClose: () => void;
}

export const CreateEditCollectionModal: FC<Props> = ({
  show,
  collection,
  onClose,
}) => {
  const queryClent = useQueryClient();
  const history = useHistory();

  const [collectionName, setCollectionName] = useState(collection?.name || '');

  const [folderLoc, setFolderLoc] = useState(
    `${ipcRenderer.sendSync(
      'get-default-icon-storage-folder'
    )}/collection-${uuidv4()}`
  );

  const onSubmit = () => {
    if (!collection?.id) {
      const updatedCollection: Collection = {
        name: collectionName,
        folderSrc: folderLoc,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      return CollectionsApi.create(updatedCollection).then(
        async (newCollectionId) => {
          await queryClent.invalidateQueries('collections-list');
          onClose();
          history.push(`/collections/${newCollectionId}`);
        }
      );
    }

    const updatedCollection: Partial<Collection> = {
      name: collectionName,
      updatedAt: Date.now(),
    };

    return CollectionsApi.update(collection.id, updatedCollection).then(
      async () => {
        await queryClent.invalidateQueries('collections-list');
        onClose();
      }
    );
  };

  const afterModalClose = () => {
    setCollectionName('');
    setFolderLoc(
      `${ipcRenderer.sendSync(
        'get-default-icon-storage-folder'
      )}/collection-${uuidv4()}`
    );
  };

  useEffect(() => {
    setCollectionName(collection?.name || '');
  }, [collection]);

  return (
    <Modal
      show={show}
      title={collection?.id ? 'Update collection' : 'Create a new collection'}
      onClose={onClose}
      className="w-52"
      footer={
        <Button type="primary" onClick={onSubmit}>
          {collection?.id ? 'Update' : 'Create'}
        </Button>
      }
      afterClose={afterModalClose}
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
            disabled={!!collection?.id}
            onChange={(path) => setFolderLoc(path)}
          />
        </label>
      </div>
    </Modal>
  );
};
