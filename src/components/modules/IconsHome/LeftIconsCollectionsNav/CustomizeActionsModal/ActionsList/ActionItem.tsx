import { CollectionAction } from 'data/collections';
import { inlineIconsMap } from 'data/collections/iconActions/inlineIconsMap';
import { FC } from 'react';
import { ReactComponent as EditIcon } from 'assets/icons/pencil-alt.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as EyeOffIcon } from 'assets/icons/eye-off.svg';
import { ActionsListProps } from '.';

interface Props extends Omit<ActionsListProps, 'actionItems'> {
  item: CollectionAction;
  onActionChange: (selectedAction: CollectionAction) => void;
}

export const ActionItem: FC<Props> = ({
  item,
  onEditClick,
  onActionChange,
}) => {
  const icon = inlineIconsMap[item.icon];

  const onVisibleChange = () => {
    onActionChange({ ...item, hidden: !item.hidden });
  };

  return (
    <div className="group p-1 border-b border-gray-400 relative flex">
      <div className="text-gray-200 group flex items-center w-full outline-none px-2 py-2 text-sm">
        <div className="mr-2">{icon}</div>
        {item.name}
      </div>

      <div className="group-hover:opacity-100 opacity-10 w-0 h-full relative top-0 -right-2">
        <div className="absolute px-2 py-2 flex gap-3">
          {item.isEditable && (
            <button
              className="outline-none"
              type="button"
              onClick={() => onEditClick(item)}
            >
              <EditIcon />
            </button>
          )}
          <button
            className="outline-none"
            type="button"
            onClick={onVisibleChange}
          >
            {item.hidden ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};
