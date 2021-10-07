import { FC, useState } from 'react';
import { ReactComponent as CursorIcon } from 'assets/icons/cursor-click.svg';
import { defaultCollectionActions } from 'data/collections/iconActions/constants';
import { ActionItem } from './ActionItem';

export const ActionsList: FC = () => {
  const [actionsList] = useState(defaultCollectionActions);

  return (
    <div className="w-56 h-72 relative left-14 bottom-5 bg-gray-600 rounded-md shadow-lg z-10 flex flex-col">
      <CursorIcon className="absolute -top-2 -left-2" />
      {actionsList.map((item) => (
        <ActionItem key={item.action} item={item} />
      ))}
    </div>
  );
};
