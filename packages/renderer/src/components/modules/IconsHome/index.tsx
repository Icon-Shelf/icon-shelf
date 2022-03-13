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
import { useInfiniteQuery } from 'react-query';
import { useResetSetSelectedIcon } from './hooks';

const IconsHome: FC = () => {
  const { collectionId = '' } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['icons-list', collectionId, searchQuery],
    ({ pageParam = 0 }) =>
      IconsApi.getIconsInCollection({
        collectionId,
        searchQuery,
        pageParam,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
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
          icons={data?.pages.map((page) => page.data).flat()}
          selectedIcon={selectedIcon || data?.pages?.[0]?.data?.[0] || null}
          setSelectedIcon={setSelectedIcon}
          searchQuery={searchQuery}
        />

        <div className="flex w-full items-center justify-center">
          <button onClick={() => fetchNextPage()}>
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </button>
        </div>
      </div>

      <RightIconDetailsSection selectedIcon={selectedIcon || data?.pages?.[0]?.data?.[0] || null} />
    </div>
  );
};

export { IconsHome as default };
