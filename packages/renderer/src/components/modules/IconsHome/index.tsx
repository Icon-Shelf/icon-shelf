import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { IconCardsSection } from './IconCardsSection';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';
import { SearchAddTopSection } from './SearchAddTopSection';
import type { Icon } from '/@/data/icons';
import { IconsApi } from '/@/data/icons';
import { useCheckIfAnyNewIconsInFolder } from '/@/data/icons/hooks';

const IconsHome: FC = () => {
  const { collectionId = '' } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>();

  const { data: icons } = useQuery(
    ['icons-list', collectionId, searchQuery],
    () =>
      IconsApi.findAllInCollection(collectionId, searchQuery).catch(() => {
        return [];
      }),
    {
      keepPreviousData: true,
    }
  );

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  useCheckIfAnyNewIconsInFolder(collectionId);

  useEffect(() => {
    setSelectedIcon(icons?.[0] || null);
  }, [collectionId, icons]);

  if (!icons) {
    return <></>;
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      <LeftIconsCollectionsNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <SearchAddTopSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <IconCardsSection
          icons={icons}
          selectedIcon={selectedIcon || icons[0]}
          setSelectedIcon={setSelectedIcon}
          searchQuery={searchQuery}
        />
      </div>

      <RightIconDetailsSection selectedIcon={selectedIcon || icons[0]} />
    </div>
  );
};

export { IconsHome as default };
