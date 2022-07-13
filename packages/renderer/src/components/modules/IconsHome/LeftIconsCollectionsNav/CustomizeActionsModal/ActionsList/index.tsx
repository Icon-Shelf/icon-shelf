import type { Dispatch, FC, SetStateAction } from 'react';
import { ReactComponent as CursorIcon } from '/assets/icons/cursor-click.svg';
import type { CollectionAction } from '/@/data/collections';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
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

export const ActionsList: FC<React.PropsWithChildren<ActionsListProps>> = ({
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
      <div className="text-body dark:text-white">Configure actions for icons in collection</div>

      <div className="mt-3">
        <div className="relative">
          <TempIconCard />
          <CursorIcon className="absolute bottom-0 left-16 z-20 text-gray-500 dark:text-white" />
        </div>

        <div className="relative -top-4 ml-4 h-72 overflow-y-auto">
          <div className="relative left-14 -bottom-1 z-10 flex w-56 flex-col rounded-md bg-gray-200 shadow-lg ring ring-gray-400 dark:bg-gray-600">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={actionItems} strategy={verticalListSortingStrategy}>
                {actionItems.map((item) => (
                  <ActionItem key={item.id} item={item} onEditClick={onEditClick} {...rest} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
};
