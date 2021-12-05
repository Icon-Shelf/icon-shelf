import { Menu, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren, ReactNode, FC } from 'react';

interface Props {
  menuItemsClassName?: string;
  overlay?: ReactNode;
  onMenuButtonClick?: (opened: boolean) => void;
}

export const Dropdown = ({
  menuItemsClassName = '',
  overlay,
  children,
  onMenuButtonClick,
}: PropsWithChildren<Props>) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center outline-none">{children}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        beforeEnter={() => onMenuButtonClick && onMenuButtonClick(true)}
        beforeLeave={() => onMenuButtonClick && onMenuButtonClick(false)}
      >
        <Menu.Items
          className={`absolute right-0 w-max mt-2 origin-top-right bg-gray-600 rounded-md shadow-lg ring-2 ring-white ring-opacity-5 z-10 focus:outline-none ${menuItemsClassName}`}
        >
          {overlay}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const DropdownItem: FC<{
  className?: string;
  onClick?: () => void;
}> = ({ className = '', children, ...rest }) => {
  return (
    <div className="px-1 py-1" {...rest}>
      <Menu.Item>
        {({ active }) => (
          <button
            type="button"
            className={`${
              active ? 'bg-black2 text-white' : 'text-gray-200'
            } group flex rounded-md items-center w-full outline-none px-2 py-2 text-sm ${className}`}
          >
            {children}
          </button>
        )}
      </Menu.Item>
    </div>
  );
};

Dropdown.Item = DropdownItem;
