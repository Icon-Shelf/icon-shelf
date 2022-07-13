import type { FC } from 'react';

const Submenu: FC<React.PropsWithChildren<{
  position?: 'left' | 'right' | 'bottom' | 'left-top' | 'right-top';
  className?: string;
}>> = ({ children, position, className = '', ...props }) => (
  <div
    className={`multi-dropdown-submenu multi-dropdown-submenu--${position} ${className}`}
    {...props}
  >
    <ul>{children}</ul>
  </div>
);

export default Submenu;
