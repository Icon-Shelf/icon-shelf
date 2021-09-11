import { FC, useState } from 'react';
import { Input } from 'components/ui/atomic-components';
import { Icon, IconsApi } from 'data/icons';
import { useQuery } from 'react-query';
import { useCheckIfAnyNewIconsInFolder } from 'data/icons/hooks';
import { useParams } from 'react-router-dom';
import { IconCardsSection } from './IconCardsSection';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';
import { AddIconToCollection } from './LeftIconsCollectionsNav/AddIconToCollection';
import { useRegisterIpcRendererCallbacks } from './hooks/useRegisterIpcRendererCallbacks';

const { Search } = Input;

const IconsHome: FC = () => {
  const { collectionId }: { collectionId: string } = useParams();

  const { data: icons } = useQuery(['icons-list', collectionId], () =>
    IconsApi.findAllInCollection(collectionId).catch(() => {
      return [];
    })
  );

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  useCheckIfAnyNewIconsInFolder(collectionId);
  useRegisterIpcRendererCallbacks(collectionId);

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
          <AddIconToCollection />
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
