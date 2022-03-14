import type { Dispatch, SetStateAction } from 'react';
import { findSelectedIconPos, getNumberOfIconInRow } from '../util';
import type { Icon } from '/@/data/icons';

export const useHotKeyConfig = ({
  icons,
  setSelectedIcon,
}: {
  icons?: Icon[];
  setSelectedIcon: Dispatch<SetStateAction<Icon | null>>;
}) => {
  const keyMap = {
    MOVE_UP: 'up',
    MOVE_DOWN: 'down',
    MOVE_RIGHT: 'right',
    MOVE_LEFT: 'left',
  };

  const selectIcon = (icon: Icon) => {
    setSelectedIcon(icon);
    const iconDom = document.querySelector(`[data-icon-card-id="${icon.id}"]`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    iconDom?.scrollIntoViewIfNeeded(false);
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

  return {
    keyMap,
    handlers,
  };
};
