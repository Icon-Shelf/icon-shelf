import { CollectionAction } from 'data/collections';
import { inlineIconsMap } from 'data/collections/iconActions/inlineIconsMap';
import { FC } from 'react';
import { ReactComponent as EditIcon } from 'assets/icons/pencil-alt.svg';

interface Props {
  item: CollectionAction;
}

export const ActionItem: FC<Props> = ({ item }) => {
  const icon = inlineIconsMap[item.icon];

  return (
    <div className="group p-1 border-b border-gray-400 relative">
      <div className="text-gray-200 group flex items-center w-full outline-none px-2 py-2 text-sm">
        <div className="mr-2">{icon}</div>
        {item.name}
      </div>

      <div className="group-hover:opacity-100 opacity-0 absolute -right-9 top-3 px-2 py-1 ">
        <button className="outline-none" type="button">
          <EditIcon />
        </button>
      </div>
    </div>
  );
};
