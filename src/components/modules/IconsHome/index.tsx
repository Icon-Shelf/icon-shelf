import React, { FC, useEffect, useState } from 'react';

import { Icon } from '../../../data/icons';
import { IconDetailsSection } from './DetailsSectoin/IconDetailsSection';
import { IconsListSection } from './List/IconsListSection';

const IconsHome: FC = () => {
  const [iconsList, setIconsList] = useState<Icon[]>([]);

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>([][0] || null);

  const onIconSelect = (icon: Icon) => {
    setSelectedIcon(icon);
  };

  useEffect(() => {
    (async function () {
      // const icons = await IconsApi.getAllIcons();
      // setIcons(icons);
    })();
  }, []);

  return (
    <div className="w-full h-full flex">
      <IconsListSection
        icons={iconsList}
        selectedIcon={selectedIcon}
        onIconSelect={onIconSelect}
      />
      <IconDetailsSection selectedIcon={selectedIcon} />
    </div>
  );
};

export { IconsHome as default };
