import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import type { Icon } from '/@/data/icons/types';
import { HotKeys } from 'react-hotkeys';
import { IconCard } from './IconCard';
import { EmptyPlaceholder } from './EmptyPlaceholder';
import { IconContextMenu } from './IconContextMenu';
import { VirtualizedGrid } from '@mierak/react-virtualized-grid';
import { useHotKeyConfig } from './hooks';

interface Props {
  icons?: Icon[];
  selectedIcon: Icon | null;
  setSelectedIcon: Dispatch<SetStateAction<Icon | null>>;
  searchQuery?: string | null;
}

export const IconCardsSection: FC<React.PropsWithChildren<Props>> = ({
  icons,
  selectedIcon,
  setSelectedIcon,
  searchQuery,
}) => {
  const wrapperDivRef = useRef<HTMLDivElement>(null);

  const { keyMap, handlers } = useHotKeyConfig({ icons, setSelectedIcon });

  const [refreshGrid, setRefreshGrid] = useState(false);
  useEffect(() => {
    setRefreshGrid(true);
    setTimeout(() => setRefreshGrid(false), 1);
  }, [icons]);

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
          <VirtualizedGrid
            rowHeight={128}
            cellWidth={128}
            gridGap={12}
            itemCount={icons.length}
            gridHeight={'min(min-content, 100%'}
            className={'virtualized-icons-grid-container px-4 pb-16'}
            debounceDelay={100}
            prerenderScreens={5}
          >
            {(index) => {
              const icon = icons[index];
              return (
                <IconCard
                  key={icon?.id}
                  icon={icon}
                  isSelected={selectedIcon?.id === icon?.id}
                  setSelectedIcon={setSelectedIcon}
                />
              );
            }}
          </VirtualizedGrid>
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
