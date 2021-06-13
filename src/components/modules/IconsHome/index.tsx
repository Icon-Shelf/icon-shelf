import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { Icon, IconsApi } from 'data/icons';
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
      const icons = await IconsApi.getAllIcons();
      setIconsList(icons);
      setSelectedIcon(icons[0] || null);
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
