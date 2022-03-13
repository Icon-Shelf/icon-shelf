import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IconCardsSection } from './IconCardsSection';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';
import { SearchAddTopSection } from './SearchAddTopSection';
import type { Icon } from '/@/data/icons';
import { IconsApi } from '/@/data/icons';
import { useCheckIfAnyNewIconsInFolder } from '/@/data/icons/hooks';
import { useInfiniteQuery } from 'react-query';

const IconsHome: FC = () => {
  const { collectionId = '' } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery(
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

  // useEffect(() => {
  //   setSelectedIcon(icons?.[0] || null);
  // }, [collectionId, icons]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  } else if (status === 'error') {
    return <p>Error</p>;
  }

  // if (!icons) {
  //   return <></>;
  // }

  return (
    <div className="flex h-full w-full overflow-hidden">
      <LeftIconsCollectionsNav />

      <div className="relative flex flex-1 flex-col">
        <SearchAddTopSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <IconCardsSection
          icons={data?.pages.map((page) => page.data).flat()}
          // selectedIcon={selectedIcon || icons[0]}
          selectedIcon={selectedIcon}
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

      {/* <RightIconDetailsSection selectedIcon={selectedIcon || icons[0]} /> */}
      <RightIconDetailsSection selectedIcon={selectedIcon} />
    </div>
  );
};

export { IconsHome as default };
