import { FC, ReactNode } from 'react';
import { ReactComponent as OptionsIcon } from 'assets/icons/dots-horizontal.svg';
import { ReactComponent as CollectionIcon } from 'assets/icons/collection.svg';
import './styles.css';

interface Props {
  name: string;
  icon?: ReactNode;
}

export const ListItem: FC<Props> = ({ name, icon = <CollectionIcon /> }) => {
  return (
    <div className="leftnav-list-item flex justify-between px-4 py-1 hover:bg-gray-800">
      <div className="flex gap-2 text-white cursor-default">
        {icon}
        {name}
      </div>
      <div className="leftnav-list-item-optionsIcon invisible cursor-pointer">
        <OptionsIcon className="hover:text-white" />
      </div>
    </div>
  );
};
