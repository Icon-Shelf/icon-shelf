import { FC, useCallback, useEffect, useState } from 'react';
import { Button } from 'components/ui/atomic-components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { AddIconToCollectionModal } from './modal';

export const AddIconToCollection: FC = () => {
  const [showIconAddModal, setShowIconAddModal] = useState(false);

  const handleDragStart = useCallback((event: Event) => {
    setShowIconAddModal(true);
    event.preventDefault();
  }, []);

  useEffect(() => {
    const dom = document.querySelector('#root');
    dom?.addEventListener('dragover', handleDragStart);

    return () => {
      dom?.removeEventListener('dragover', handleDragStart);
    };
  }, [handleDragStart]);

  return (
    <>
      <Button
        className="ml-4"
        id="add-icon-to-collection-btn"
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
