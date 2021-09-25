import { Button, Modal } from 'components/ui/atomic-components';
import { FC, useState } from 'react';

export const UpdateChecker: FC = ({ children }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(true);

  return (
    <>
      {children}
      <Modal
        show={showUpdateModal}
        title="Update available"
        onClose={() => setShowUpdateModal(false)}
        className="w-52"
        footer={<Button type="primary">Update</Button>}
      >
        <p>A new version of Icon Shelf </p>
      </Modal>
    </>
  );
};
