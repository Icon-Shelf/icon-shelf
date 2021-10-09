import { FC } from 'react';
import { ReactComponent as CursorIcon } from 'assets/icons/cursor-click.svg';
import { CollectionAction } from 'data/collections';
import { ActionItem } from './ActionItem';
import { TempIconCard } from './TempIconCard';

export interface ActionsListProps {
  actionItems: CollectionAction[];
  onEditClick: (selectedAction: CollectionAction) => void;
  onActionChange: (selectedAction: CollectionAction) => void;
}

export const ActionsList: FC<ActionsListProps> = ({
  actionItems,
  onEditClick,
  ...rest
}) => {
  return (
    <>
      <div className="text-white">
        Configure actions for icons in collection
      </div>

      <div className="mt-3 relative">
        <TempIconCard />

        <div className="w-56 h-72 relative left-14 bottom-5 bg-gray-600 rounded-md shadow-lg z-10 flex flex-col">
          <CursorIcon className="absolute -top-2 -left-2" />
          {actionItems.map((item) => (
            <ActionItem
              key={item.id}
              item={item}
              onEditClick={onEditClick}
              {...rest}
            />
          ))}
        </div>
      </div>
    </>
  );
};
