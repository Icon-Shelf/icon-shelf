import { FC } from 'react';
import { Modal, Button } from 'components/ui/atomic-components';
import { Collection } from 'data/collections';
import { TempIconCard } from './TempIconCard';
import { ActionsList } from './ActionsList';

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
      className="max-w-4xl"
      footer={<Button type="primary">Done</Button>}
    >
      <div className="text-white">
        Configure actions for icons in collection
      </div>

      <div className="mt-3 relative">
        <TempIconCard />

        <ActionsList />
      </div>
    </Modal>
  );
};
