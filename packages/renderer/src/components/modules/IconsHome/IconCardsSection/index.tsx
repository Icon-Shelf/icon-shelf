import type { Dispatch, FC, SetStateAction } from 'react';
import { useRef } from 'react';
import type { Icon } from '/@/data/icons/types';
import { HotKeys } from 'react-hotkeys';
import { IconCard } from './IconCard';
import { EmptyPlaceholder } from './EmptyPlaceholder';
import { IconContextMenu } from './IconContextMenu';
import { findSelectedIconPos, getNumberOfIconInRow } from './util';

interface Props {
  icons?: Icon[];
  selectedIcon: Icon | null;
  setSelectedIcon: Dispatch<SetStateAction<Icon | null>>;
  searchQuery?: string | null;
}

export const IconCardsSection: FC<Props> = ({
  icons,
  selectedIcon,
  setSelectedIcon,
  searchQuery,
}) => {
  const wrapperDivRef = useRef<HTMLDivElement>(null);

  const selectIcon = (icon: Icon) => {
    setSelectedIcon(icon);
    const iconDom = document.querySelector(`[data-icon-card-id="${icon.id}"]`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    iconDom?.scrollIntoViewIfNeeded(false);
  };

  const keyMap = {
    MOVE_UP: 'up',
    MOVE_DOWN: 'down',
    MOVE_RIGHT: 'right',
    MOVE_LEFT: 'left',
  };

  const handlers = {
    MOVE_RIGHT: (keyEvent?: Event) => {
      if (icons?.length) {
        const selectedIconPos = findSelectedIconPos(icons);

        if (typeof selectedIconPos === 'number' && icons[selectedIconPos + 1]) {
          selectIcon(icons[selectedIconPos + 1]);
        }

        keyEvent?.preventDefault();
      }
    },
    MOVE_LEFT: (keyEvent?: Event) => {
      if (icons?.length) {
        const selectedIconPos = findSelectedIconPos(icons);

        if (typeof selectedIconPos === 'number' && icons[selectedIconPos - 1]) {
          selectIcon(icons[selectedIconPos - 1]);
        }
        keyEvent?.preventDefault();
      }
    },
    MOVE_DOWN: (keyEvent?: Event) => {
      if (icons?.length) {
        const selectedIconPos = findSelectedIconPos(icons);
        const numberOfIconInRow = getNumberOfIconInRow();

        if (typeof selectedIconPos === 'number' && icons[selectedIconPos + numberOfIconInRow]) {
          selectIcon(icons[selectedIconPos + numberOfIconInRow]);
        }
        keyEvent?.preventDefault();
      }
    },
    MOVE_UP: (keyEvent?: Event) => {
      if (icons?.length) {
        const selectedIconPos = findSelectedIconPos(icons);
        const numberOfIconInRow = getNumberOfIconInRow();

        if (typeof selectedIconPos === 'number' && icons[selectedIconPos - numberOfIconInRow]) {
          selectIcon(icons[selectedIconPos - numberOfIconInRow]);
        }
        keyEvent?.preventDefault();
      }
    },
  };

  if (!icons?.length) {
    return <EmptyPlaceholder searchQuery={searchQuery} />;
  }

  return (
    <div
      className="w-full h-full overflow-y-auto overflow-x-hidden pb-6 relative"
      ref={wrapperDivRef}
    >
      <HotKeys keyMap={keyMap} handlers={handlers} className="outline-none">
        <div
          id="icon-list-grid"
          className="flex-1 w-full p-4 pt-1 grid gap-3 grid-flow-row place-items-center h-auto"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
            gridTemplateRows: 'repeat(auto-fill, 8rem)',
          }}
        >
          {icons?.map((icon) => (
            <IconCard
              key={icon.id}
              icon={icon}
              isSelected={selectedIcon?.id === icon?.id}
              setSelectedIcon={setSelectedIcon}
            />
          ))}
        </div>
      </HotKeys>
      {wrapperDivRef.current && <IconContextMenu parentDom={wrapperDivRef.current} />}
    </div>
  );
};
