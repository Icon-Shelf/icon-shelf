import { FC, ReactNode } from 'react';
import { ReactComponent as OptionsIcon } from 'assets/icons/dots-horizontal.svg';
import { ReactComponent as CollectionIcon } from 'assets/icons/collection.svg';
import { Link } from 'react-router-dom';
import { Dropdown } from 'components/ui/atomic-components';
import { Collection } from 'data/collections';
import { OptionsOverlay } from './OptionsOverlay';

interface Props {
  name: string;
  id: string;
  icon?: ReactNode;
  isActive: boolean;
  hideOptions?: boolean;
  collection?: Collection;
}

export const ListItem: FC<Props> = ({
  name,
  id,
  icon = <CollectionIcon />,
  isActive,
  hideOptions,
  collection,
}) => {
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
      {!hideOptions && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={(e) => e.preventDefault()}>
          <Dropdown
            overlay={<OptionsOverlay id={id} collection={collection} />}
          >
            <OptionsIcon
              className={`opacity-0 leftnav-list-item-optionsIcon cursor-pointer hover:text-white group-hover:opacity-100 ${
                isActive ? 'text-white' : ''
              }`}
            />
          </Dropdown>
        </div>
      )}
    </Link>
  );
};
