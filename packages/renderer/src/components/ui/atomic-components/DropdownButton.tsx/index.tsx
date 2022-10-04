import { Menu } from '@headlessui/react';
import type { PropsWithChildren, ReactNode } from 'react';

interface Props {
  position?: 'top' | 'bottom' | 'left' | 'right';
  buttonText: ReactNode;
  onClickPrimaryAction: () => void;
}

export const DropdownButton = ({
  children,
  buttonText,
  position,
  onClickPrimaryAction,
}: PropsWithChildren<Props>) => {
  return (
    <div className="relative flex w-full items-center justify-center ">
      <button
        type="button"
        onClick={onClickPrimaryAction}
        className="flex min-h-[3rem] basis-4/5 items-center justify-center rounded-l-md bg-primary px-4 py-2 text-sm text-white ring-offset-2 ring-offset-black2 hover:bg-purple-700 focus:ring-2 focus:ring-primary active:bg-purple-800"
      >
        {buttonText}
      </button>
      <div className="h-12 w-[2px] bg-gray-200 dark:bg-black2" />
      <Menu>
        <Menu.Button className="flex min-h-[3rem] items-center justify-center rounded-r-md bg-primary px-3 py-2 ring-offset-2 ring-offset-black2 hover:bg-purple-700 focus:ring-2 focus:ring-primary active:bg-purple-800">
          <EllipsisIcon />
        </Menu.Button>
        <Menu.Items className="absolute right-0 top-0 z-50 flex -translate-y-[102%] flex-col items-start divide-y-[1px] divide-gray-400 rounded-md bg-gray-600">
          {children}
        </Menu.Items>
      </Menu>
    </div>
  );
};

interface ItemProps {
  name: string;
  icon?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: () => any;
  as: 'div' | 'button';
  position?: 'left' | 'right';
}

const MenuItem = ({ children = null, as, name, icon, onClick }: PropsWithChildren<ItemProps>) => {
  return (
    <div className="group w-full p-1">
      <Menu.Item
        as={as}
        onClick={onClick}
        className={({ active }) =>
          `relative flex w-full items-center  gap-2 rounded-md p-2 text-start text-sm text-white ${
            active ? 'bg-black2' : ''
          } hover:bg-black2`
        }
      >
        <span>{icon}</span>
        <span>{name}</span>
        {children}
      </Menu.Item>
    </div>
  );
};

const SubMenu = ({ children }: { children: ReactNode }) => {
  return (
    <div className="invisible group-hover:visible">
      <Menu.Items
        static
        className={`absolute -left-1 top-0  flex min-w-[10rem] -translate-x-full flex-col items-start divide-y-[1px] divide-gray-400 rounded-md bg-gray-600 ring-1 ring-white`}
      >
        {children}
      </Menu.Items>
    </div>
  );
};

DropdownButton.MenuItem = MenuItem;
DropdownButton.SubMenu = SubMenu;

const EllipsisIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-white"
    >
      <path
        fillRule="evenodd"
        d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};
