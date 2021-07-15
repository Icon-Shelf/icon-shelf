import React, { FC } from 'react';

export const Layout: FC = ({ children }) => {
  return <div className="flex w-full h-full">{children}</div>;
};
