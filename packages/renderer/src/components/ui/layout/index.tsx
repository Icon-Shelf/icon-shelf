import type { FC } from 'react';
import { TitleBarDrag } from '../atomic-components';

export const Layout: FC = ({ children }) => {
  return (
    <div className="flex w-full h-full bg-white dark:bg-black1">
      <TitleBarDrag />
      {children}
    </div>
  );
};
