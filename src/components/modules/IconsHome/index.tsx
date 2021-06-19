import React, { FC, useEffect, useState } from 'react';
import { Icon } from 'data/icons';
import { firestore } from 'configs/firebase';
import { IconDetailsSection } from './DetailsSectoin';
import { IconsListSection } from './List/IconsListSection';

const IconsHome: FC = () => {
  const [iconsList, setIconsList] = useState<Icon[]>([]);

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>([][0] || null);

  const onIconSelect = (icon: Icon) => {
    setSelectedIcon(icon);
  };

  useEffect(() => {
    (async function () {
      firestore
        .collection('icons')
        .orderBy('updatedAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const icons: Icon[] = [];
          querySnapshot.forEach((doc) => {
            icons.push(doc.data() as Icon);
          });

          setIconsList(icons);
          setSelectedIcon(icons[0] || null);
        });
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
