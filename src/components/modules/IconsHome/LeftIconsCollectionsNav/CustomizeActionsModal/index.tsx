import { FC } from 'react';
import { Modal, Button } from 'components/ui/atomic-components';
import { Collection } from 'data/collections';

interface Props {
  show: boolean;
  collection?: Collection | null;
  onClose: () => void;
}

export const CustomizeActionsModal: FC<Props> = ({
  show,
  collection,
  onClose,
}) => {
  return (
    <Modal
      show={show}
      title="Customize collection actions"
      onClose={onClose}
      className="w-52"
      footer={<Button type="primary">Done</Button>}
    >
      <div className="text-white">
        Configure actions for icons in collection
      </div>
    </Modal>
  );
};
