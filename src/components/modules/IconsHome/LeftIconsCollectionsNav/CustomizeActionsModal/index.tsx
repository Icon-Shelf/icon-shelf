import { FC, useState } from 'react';
import { Modal, Button } from 'components/ui/atomic-components';
import { Collection, CollectionAction } from 'data/collections';
import { defaultCollectionActions } from 'data/collections/iconActions/constants';
import { ActionsList } from './ActionsList';
import { EditActionSection } from './EditActionSection';

interface Props {
  show: boolean;
  collection?: Collection | null;
  onClose: () => void;
}

export const CustomizeActionsModal: FC<Props> = ({
  show,
  // collection,
  onClose,
}) => {
  const [actionItems, setActionItems] = useState(defaultCollectionActions);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<CollectionAction | null>(
    null
  );

  const onEditClick = (action: CollectionAction) => {
    setShowEditScreen(true);
    setSelectedAction(action);
  };

  const onBackClick = () => {
    setShowEditScreen(false);
    setSelectedAction(null);
  };

  const onActionChange = (action: CollectionAction) => {
    const actionItemsCopy = [...actionItems];
    const index = actionItemsCopy.findIndex((item) => item.id === action.id);

    if (index > -1) {
      actionItemsCopy[index] = action;
      setActionItems(actionItemsCopy);
    }
  };

  return (
    <Modal
      show={show}
      title="Customize collection actions"
      onClose={onClose}
      className="max-w-4xl"
      footer={
        <Button type="primary" disabled={showEditScreen}>
          Done
        </Button>
      }
    >
      {showEditScreen && selectedAction ? (
        <EditActionSection action={selectedAction} onBackClick={onBackClick} />
      ) : (
        <ActionsList
          actionItems={actionItems}
          onEditClick={onEditClick}
          onActionChange={onActionChange}
        />
      )}
    </Modal>
  );
};
