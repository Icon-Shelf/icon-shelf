import React, { FC } from 'react';
import { Icon } from 'data/icons';

import { IconsList } from './IconsList';

interface Props {
  icons: Icon[];
  selectedIcon: Icon | null;
  onIconSelect: (icon: Icon) => void;
}

export const IconsListSection: FC<Props> = ({
  icons,
  selectedIcon,
  onIconSelect,
}) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <h2 className="text-3xl font-medium mt-4 ml-4">Icons</h2>

      <IconsList
        icons={icons}
        selectedIcon={selectedIcon}
        onIconSelect={onIconSelect}
      />
    </div>
  );
};
