import { FC } from 'react';
import { Button, Input } from 'components/ui/atomic-components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { IconCardsSection } from './IconCardsSection';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';

const { Search } = Input;

const IconsHome: FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <LeftIconsCollectionsNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex mt-5 mx-4">
          <Search
            name="icons-search"
            placeholder="Search Icons"
            className="flex-1"
          />
          <Button className="ml-4" icon={<PlusIcon />}>
            Add icon
          </Button>
        </div>
        <IconCardsSection />
      </div>

      <RightIconDetailsSection />
    </div>
  );
};

export { IconsHome as default };
