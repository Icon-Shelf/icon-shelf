import { FC } from 'react';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';

const IconsHome: FC = () => {
  return (
    <div className="w-full h-full flex">
      <LeftIconsCollectionsNav />
    </div>
  );
};

export { IconsHome as default };
