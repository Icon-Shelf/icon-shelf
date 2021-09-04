import { FC } from 'react';
import { Modal, Button } from 'components/ui/atomic-components';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import { CollectionsDropdown } from './CollectionsDropdown';

interface Props {
  show: boolean;
  onClose: () => void;
}

export const AddIconToCollectionModal: FC<Props> = ({ show, onClose }) => {
  return (
    <Modal
      show={show}
      title="Add icons to collection"
      onClose={onClose}
      className="w-96"
      footer={<Button type="primary">Add</Button>}
    >
      <div>
        <label className="mb-2 font-medium text-gray-400">
          Collection to add icons to
        </label>
        <CollectionsDropdown />

        <button
          className="w-full flex flex-col items-center justify-center outline-none border-2 border-gray-500 border-dashed rounded-md py-14"
          type="button"
        >
          <UploadIcon />
          <div className="flex flex-col items-center">
            <span className="text-sm text-white">
              Drag and drop your icons here
            </span>

            <span className="text-xs">or click to browse your files</span>
          </div>
        </button>
      </div>
    </Modal>
  );
};
