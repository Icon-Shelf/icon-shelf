import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Modal, Button } from '/@/components/ui/atomic-components';
import type { Collection, CollectionAction } from '/@/data/collections';
import { CollectionsApi } from '/@/data/collections';
import { getIconActionOfCollection } from '/@/data/collections/iconActions/utils';
import { useQueryClient } from 'react-query';
import { ActionsList } from './ActionsList';
import { EditActionSection } from './EditActionSection';

interface Props {
  show: boolean;
  collection?: Collection | null;
  onClose: () => void;
}

export const CustomizeActionsModal: FC<Props> = ({ show, collection, onClose }) => {
  const queryClient = useQueryClient();

  const [actionItems, setActionItems] = useState<CollectionAction[]>([]);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<CollectionAction | null>(null);

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

      // if made hidden move to last
      if (action.hidden) {
        actionItemsCopy.splice(index, 1);
        actionItemsCopy.push(action);
      }
      setActionItems(actionItemsCopy);
    }
  };

  const onSubmit = async () => {
    if (collection && collection.id) {
      const updatedCollection = { ...collection, actions: actionItems };
      await CollectionsApi.update(collection.id, updatedCollection);
    }

    onClose();
    queryClient.invalidateQueries('collections-list');
  };

  const afterClose = () => {
    setActionItems([]);
    setShowEditScreen(false);
    setSelectedAction(null);
  };

  useEffect(() => {
    if (collection) {
      setActionItems(getIconActionOfCollection(collection));
    }
  }, [collection]);

  return (
    <Modal
      show={show}
      title="Customize collection actions"
      onClose={onClose}
      className="max-w-4xl"
      afterClose={afterClose}
      footer={
        !showEditScreen ? (
          <Button type="primary" onClick={onSubmit}>
            Done and save
          </Button>
        ) : (
          <></>
        )
      }
    >
      {showEditScreen && selectedAction ? (
        <EditActionSection
          action={selectedAction}
          onBackClick={onBackClick}
          onActionChange={onActionChange}
        />
      ) : (
        <ActionsList
          actionItems={actionItems}
          onEditClick={onEditClick}
          onActionChange={onActionChange}
          setActionItems={setActionItems}
        />
      )}
    </Modal>
  );
};
