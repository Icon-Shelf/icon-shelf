import type { FC } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { IconCardsSection } from './IconCardsSection';
import { LeftIconsCollectionsNav } from './LeftIconsCollectionsNav';
import { RightIconDetailsSection } from './RightIconDetailsSection';
import { SearchAddTopSection } from './SearchAddTopSection';
import type { Icon } from '/@/data/icons';
import { IconsApi } from '/@/data/icons';
import { useCheckIfAnyNewIconsInFolder } from '/@/data/icons/hooks';
import { useQuery } from '@tanstack/react-query';
import { useResetSetSelectedIcon } from './hooks';

const SORTING_STATES = {
  ASC: false,
  DESC: true,
  NONE: undefined,
};

const IconsHome: FC<React.PropsWithChildren<unknown>> = () => {
  const { collectionId = '' } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>();
  const [color, setColor] = useState<string | null | undefined>(undefined);
  const [isSortedByNameDesc, setIsSortedByNameDesc] = useState<boolean | undefined>(undefined);
  const [, setSearchParams] = useSearchParams();

  const onSortClick = useCallback((): void => {
    switch (isSortedByNameDesc) {
      case SORTING_STATES.NONE:
        setIsSortedByNameDesc(SORTING_STATES.ASC);
        setSearchParams({ sortByNameDesc: String(SORTING_STATES.ASC) });
        break;
      case SORTING_STATES.ASC:
        setIsSortedByNameDesc(SORTING_STATES.DESC);
        setSearchParams({ sortByNameDesc: String(SORTING_STATES.DESC) });
        break;
      default:
        setIsSortedByNameDesc(SORTING_STATES.NONE);
        setSearchParams();
        break;
    }
  }, [isSortedByNameDesc, setSearchParams]);

  const { data } = useQuery(
    ['icons-list', collectionId, searchQuery, { isSortedByNameDesc }],
    () =>
      IconsApi.getIconsInCollection({
        collectionId,
        searchQuery,
        isSortedByNameDesc,
      }),
    {
      keepPreviousData: true,
    }
  );

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  useCheckIfAnyNewIconsInFolder(collectionId);
  useResetSetSelectedIcon({ collectionId, setSelectedIcon });

  return (
    <div className="flex w-full h-full overflow-hidden">
      <LeftIconsCollectionsNav onSortClick={onSortClick} />

      <div className="relative flex flex-col flex-1">
        <SearchAddTopSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <IconCardsSection
          icons={data?.data}
          searchQuery={searchQuery}
          selectedIcon={selectedIcon || data?.data?.[0] || null}
          setSelectedIcon={setSelectedIcon}
          color={color}
        />
      </div>

      <RightIconDetailsSection
        selectedIcon={selectedIcon || data?.data?.[0] || null}
        color={color}
        setColor={setColor}
      />
    </div>
  );
};

export { IconsHome as default };
