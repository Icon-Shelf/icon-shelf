import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import type { Icon } from '/@/data/icons/types';
import { HotKeys } from 'react-hotkeys';
import { IconCard } from './IconCard';
import { EmptyPlaceholder } from './EmptyPlaceholder';
import { IconContextMenu } from './IconContextMenu';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useHotKeyConfig } from './hooks';

interface Props {
  icons?: Icon[];
  selectedIcon: Icon | null;
  setSelectedIcon: Dispatch<SetStateAction<Icon | null>>;
  searchQuery?: string | null;
  color: string | null | undefined;
}

export const IconCardsSection: FC<React.PropsWithChildren<Props>> = ({
  icons,
  selectedIcon,
  setSelectedIcon,
  searchQuery,
  color,
}) => {
  const wrapperDivRef = useRef<HTMLDivElement>(null);

  const { keyMap, handlers } = useHotKeyConfig({ icons, setSelectedIcon });

  const [refreshGrid, setRefreshGrid] = useState(false);
  useEffect(() => {
    setRefreshGrid(true);
    setTimeout(() => setRefreshGrid(false), 1);
  }, [icons]);

  const gridVirtualizer = useVirtualizer({
    count: icons?.length ?? 0,
    getScrollElement: () => wrapperDivRef.current,
    estimateSize: () => 128,
    scrollingDelay: 100,
    overscan: 24 * 5,
  });

  if (refreshGrid) {
    return <></>;
  }

  if (!icons?.length) {
    return <EmptyPlaceholder searchQuery={searchQuery} />;
  }

  return (
    <>
      <div className="relative h-full w-full overflow-hidden" ref={wrapperDivRef}>
        <HotKeys keyMap={keyMap} handlers={handlers} className="h-full outline-none">
          <div className="virtualized-icons-grid-container grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-3 px-4 pb-16">
            {gridVirtualizer.getVirtualItems().map((_, index) => {
              const icon = icons[index];

              return (
                <IconCard
                  key={icon?.id}
                  icon={icon}
                  isSelected={selectedIcon?.id === icon?.id}
                  setSelectedIcon={setSelectedIcon}
                  color={color}
                />
              );
            })}
          </div>
        </HotKeys>
      </div>

      {wrapperDivRef.current && (
        <IconContextMenu
          parentDom={
            wrapperDivRef.current?.querySelector(
              '.virtualized-icons-grid-container'
            ) as HTMLDivElement
          }
        />
      )}
    </>
  );
};
