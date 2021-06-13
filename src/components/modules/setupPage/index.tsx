import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { ConfigureDownloadPathModal } from './ConfigureDownloadPathModal';

export const SetupPage: FC = () => {
  const iconsLocalStorageLoc = localStorage.getItem('iconsLocalStorageLoc');

  if (iconsLocalStorageLoc) {
    return <Redirect to="/icons" />;
  }

  return <ConfigureDownloadPathModal />;
};
