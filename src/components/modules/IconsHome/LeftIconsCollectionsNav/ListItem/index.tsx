import { FC, ReactNode } from 'react';
import { ReactComponent as OptionsIcon } from 'assets/icons/dots-horizontal.svg';
import { ReactComponent as CollectionIcon } from 'assets/icons/collection.svg';
import { Link } from 'react-router-dom';
import { Dropdown } from 'components/ui/atomic-components';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-16.svg';

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
  const OptionsOverlay = (
    <Dropdown.Item className="">
      <TrashIcon className="mr-2" />
      <div>Delete</div>
    </Dropdown.Item>
  );

  return (
    <Link
      to={`/collections/${id}`}
      className={`group flex justify-between items-center px-4 py-1 hover:bg-gray-800 ${
        isActive && 'bg-primary hover:bg-primary'
      }`}
    >
      <div className="flex gap-2 text-white cursor-default">
        {icon}
        {name}
      </div>
      {/*  eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={(e) => e.preventDefault()}>
        <Dropdown overlay={OptionsOverlay}>
          <OptionsIcon
            className={`opacity-0 leftnav-list-item-optionsIcon cursor-pointer hover:text-white group-hover:opacity-100 ${
              isActive ? 'text-white' : ''
            }`}
          />
        </Dropdown>
      </div>
    </Link>
  );
};
