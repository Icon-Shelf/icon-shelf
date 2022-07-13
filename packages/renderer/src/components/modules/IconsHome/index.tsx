import type { FC } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconCardsSection } from './IconCardsSection';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';
import { SearchAddTopSection } from './SearchAddTopSection';
import type { Icon } from '/@/data/icons';
import { IconsApi } from '/@/data/icons';
import { useCheckIfAnyNewIconsInFolder } from '/@/data/icons/hooks';
import { useQuery } from 'react-query';
import { useResetSetSelectedIcon } from './hooks';

const IconsHome: FC<React.PropsWithChildren<unknown>> = () => {
  const { collectionId = '' } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>();

  const { data } = useQuery(
    ['icons-list', collectionId, searchQuery],
    () =>
      IconsApi.getIconsInCollection({
        collectionId,
        searchQuery,
      }),
    {
      keepPreviousData: true,
    }
  );

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  useCheckIfAnyNewIconsInFolder(collectionId);
  useResetSetSelectedIcon({ collectionId, setSelectedIcon });

  return (
    <div className="flex h-full w-full overflow-hidden">
      <LeftIconsCollectionsNav />

      <div className="relative flex flex-1 flex-col">
        <SearchAddTopSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <IconCardsSection
          icons={data?.data}
          searchQuery={searchQuery}
          selectedIcon={selectedIcon || data?.data?.[0] || null}
          setSelectedIcon={setSelectedIcon}
        />
      </div>

      <RightIconDetailsSection selectedIcon={selectedIcon || data?.data?.[0] || null} />
    </div>
  );
};

export { IconsHome as default };
