import { FC, useState } from 'react';
import { Button, Input } from 'components/ui/atomic-components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Icon, IconsApi } from 'data/icons';
import { useQuery } from 'react-query';
import { useCheckIfAnyNewIconsInFolder } from 'data/icons/hooks';
import { useParams } from 'react-router-dom';
import { IconCardsSection } from './IconCardsSection';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';

const { Search } = Input;

const IconsHome: FC = () => {
  const { collectionId }: { collectionId: string } = useParams();

  const { data: icons } = useQuery('icons-list', IconsApi.findAll);

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  useCheckIfAnyNewIconsInFolder();

  if (!icons) {
    return <></>;
  }

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

        <IconCardsSection
          icons={icons}
          selectedIcon={selectedIcon || icons[0]}
          setSelectedIcon={setSelectedIcon}
        />
      </div>

      <RightIconDetailsSection selectedIcon={selectedIcon || icons[0]} />
    </div>
  );
};

export { IconsHome as default };
