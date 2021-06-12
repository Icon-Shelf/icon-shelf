import React, { FC } from 'react';
import { Icon } from '../../../../data/icons';

import { IconItem } from './IconItem';

interface Props {
  icons: Icon[];
  selectedIcon: Icon | null;
  onIconSelect: (icon: Icon) => void;
}

export const IconsList: FC<Props> = ({ icons, selectedIcon, onIconSelect }) => {
  return (
    <ul
      className="my-8 mx-4 grid gap-8 text-center text-xs leading-4 col-start-1 row-start-2"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(132px, 1fr))' }}
    >
      {icons.map((icon) => (
        <IconItem
          key={icon.name}
          icon={icon}
          isSelected={icon.name === selectedIcon?.name}
          onIconSelect={onIconSelect}
        />
      ))}
    </ul>
  );
};
