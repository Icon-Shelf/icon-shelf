/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, MouseEventHandler } from 'react';

const Item: FC<React.PropsWithChildren<{
  onMouseDown?: MouseEventHandler<any> | undefined;
  isActive?: boolean;
  className?: string;
  isDisabled?: boolean;
}>> = ({ children, isActive, className = '', ...props }) => (
  <li
    className={`multi-dropdown-item ${isActive ? 'multi-dropdown-item-active' : ''} ${className}`}
    tabIndex={0}
    {...props}
  >
    {children}
  </li>
);

export default Item;
