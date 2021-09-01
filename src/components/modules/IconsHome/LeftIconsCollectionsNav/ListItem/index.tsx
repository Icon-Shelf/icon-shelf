import { FC, ReactNode } from 'react';
import { ReactComponent as OptionsIcon } from 'assets/icons/dots-horizontal.svg';
import { ReactComponent as CollectionIcon } from 'assets/icons/collection.svg';
import './styles.css';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  id: string;
  icon?: ReactNode;
  isActive: boolean;
}

export const ListItem: FC<Props> = ({
  name,
  id,
  icon = <CollectionIcon />,
  isActive,
}) => {
  return (
    <Link
      to={`/collections/${id}`}
      className={`leftnav-list-item flex justify-between px-4 py-1 hover:bg-gray-800 ${
        isActive && 'bg-primary hover:bg-primary'
      }`}
    >
      <div className="flex gap-2 text-white cursor-default">
        {icon}
        {name}
      </div>
      <div className="leftnav-list-item-optionsIcon invisible cursor-pointer">
        <OptionsIcon className="hover:text-white" />
      </div>
    </Link>
  );
};
