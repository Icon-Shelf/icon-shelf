import { FC, useState } from 'react';
import { Button } from 'components/ui/atomic-components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { AddIconToCollectionModal } from './modal';

export const AddIconToCollection: FC = () => {
  const [showIconAddModal, setShowIconAddModal] = useState(false);

  return (
    <>
      <Button
        className="ml-4"
        icon={<PlusIcon />}
        onClick={() => setShowIconAddModal(true)}
      >
        Add icon
      </Button>

      <AddIconToCollectionModal
        show={showIconAddModal}
        onClose={() => setShowIconAddModal(false)}
      />
    </>
  );
};
