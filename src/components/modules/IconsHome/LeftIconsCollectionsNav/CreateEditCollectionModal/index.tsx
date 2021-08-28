import { FC } from 'react';
import { Input, Modal, Button } from 'components/ui/atomic-components';
import { ReactComponent as FolderIcon } from 'assets/icons/folder.svg';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const CreateEditCollectionModal: FC<Props> = ({ show, onClose }) => {
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

          <div className="flex gap-4">
            <Input id="collection-name" icon={<FolderIcon />} />
            <Button>Change</Button>
          </div>
        </label>
      </div>
    </Modal>
  );
};
