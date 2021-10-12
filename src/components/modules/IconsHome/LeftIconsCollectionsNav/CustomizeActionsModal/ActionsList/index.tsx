import { Dispatch, FC, SetStateAction } from 'react';
import { ReactComponent as CursorIcon } from 'assets/icons/cursor-click.svg';
import { CollectionAction } from 'data/collections';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ActionItem } from './ActionItem';
import { TempIconCard } from './TempIconCard';

export interface ActionsListProps {
  actionItems: CollectionAction[];
  setActionItems: Dispatch<SetStateAction<CollectionAction[]>>;
  onEditClick: (selectedAction: CollectionAction) => void;
  onActionChange: (selectedAction: CollectionAction) => void;
}

export const ActionsList: FC<ActionsListProps> = ({
  actionItems,
  setActionItems,
  onEditClick,
  ...rest
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActionItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <div className="text-white">
        Configure actions for icons in collection
      </div>

      <div className="mt-3 relative">
        <TempIconCard />

        <div className="w-56 h-72 relative left-14 bottom-5 bg-gray-600 rounded-md shadow-lg z-10 flex flex-col">
          <CursorIcon className="absolute -top-2 -left-2 z-10" />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={actionItems}
              strategy={verticalListSortingStrategy}
            >
              {actionItems.map((item) => (
                <ActionItem
                  key={item.id}
                  item={item}
                  onEditClick={onEditClick}
                  {...rest}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </>
  );
};