import { FC } from 'react';
import { Input, Modal, Button } from 'components/ui/atomic-components';
import { ipcRenderer } from 'electron';

const { FolderInput } = Input;

interface Props {
  show: boolean;
  onClose: () => void;
}

export const CreateEditCollectionModal: FC<Props> = ({ show, onClose }) => {
  const defaultIconStorageFolder = ipcRenderer.sendSync(
    'get-default-icon-storage-folder'
  );

  return (
    <Modal
      show={show}
      title="Create a new collection"
      onClose={onClose}
      className="w-52"
      footer={<Button type="primary">Create</Button>}
    >
      <div>
        <label>
          <div className="mb-2 font-medium text-gray-400">
            Enter a name for the collection
          </div>
          <Input id="collection-name" className="mb-6" />
        </label>

        <label>
          <div className="mb-2 font-medium text-gray-400 focus-within:text-white">
            Icons in collection will be stored in
          </div>

          <FolderInput defaultPath={defaultIconStorageFolder} />
        </label>
      </div>
    </Modal>
  );
};
