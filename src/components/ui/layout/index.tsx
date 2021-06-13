import React, { FC } from 'react';
import { LeftNav } from './LeftNav';
import { TopSection } from './TopSection';

export const Layout: FC = ({ children }) => {
  return (
    <div className="w-full h-full">
      <div className="flex h-full">
        <LeftNav />
        <div className="flex-1 flex flex-col">
          <TopSection />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
};
