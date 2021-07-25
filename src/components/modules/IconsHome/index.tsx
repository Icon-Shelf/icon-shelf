import { FC } from 'react';
import { IconCardsSection } from './IconCardsSection';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';

const IconsHome: FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <LeftIconsCollectionsNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div />
        <IconCardsSection />
      </div>

      <RightIconDetailsSection />
    </div>
  );
};

export { IconsHome as default };
