import { FC } from 'react';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';

const IconsHome: FC = () => {
  return (
    <div className="flex w-full h-full">
      <LeftIconsCollectionsNav />

      <div className="flex-1" />

      <RightIconDetailsSection />
    </div>
  );
};

export { IconsHome as default };
