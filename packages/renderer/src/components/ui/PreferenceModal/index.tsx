import type { FC } from 'react';
import { Button, Modal } from '../atomic-components';

export const PreferenceModal: FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  return (
    <Modal
      show={show}
      title="Preferences"
      onClose={onClose}
      footer={
        <Button type="primary" onClick={onClose}>
          Done
        </Button>
      }
    ></Modal>
  );
};
