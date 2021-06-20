import React, { FC, useEffect, useState } from 'react';
import { Icon } from 'data/icons';
import { firestore } from 'configs/firebase';
import { ipcRenderer } from 'electron';
import { IconDetailsSection } from './DetailsSectoin';
import { IconsListSection } from './List/IconsListSection';

const IconsHome: FC = () => {
  const [backendIconsList, setBackendIconsList] = useState<Icon[]>([]);
  const [iconsList, setIconsList] = useState<Icon[]>([]);
  const [storedFileNames, setStoredFileNames] = useState<string[]>([]);

  const [selectedIcon, setSelectedIcon] = useState<Icon | null>([][0] || null);

  const onIconSelect = (icon: Icon) => {
    setSelectedIcon(icon);
  };

  useEffect(() => {
    firestore
      .collection('icons')
      .orderBy('updatedAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const icons: Icon[] = [];
        querySnapshot.forEach((doc) => {
          icons.push(doc.data() as Icon);
        });

        setBackendIconsList(icons);
      });
  }, []);

  useEffect(() => {
    const iconsLocalStorageLoc = localStorage.getItem('iconsLocalStorageLoc');
    const storedFiles: string[] = ipcRenderer.sendSync(
      'get-list-of-stored-icons',
      {
        path: iconsLocalStorageLoc,
      }
    );

    setStoredFileNames(storedFiles);
  }, []);

  useEffect(() => {
    const updatedIcons = backendIconsList.map((icon) => {
      return {
        ...icon,
        isInStorage: storedFileNames.some((fileName) => fileName === icon.name),
      };
    });

    setIconsList(updatedIcons);
  }, [backendIconsList, storedFileNames]);

  useEffect(() => {
    ipcRenderer.on('download-icon-reply', (_, info: { icon: Icon }) => {
      if (info.icon.name) {
        setStoredFileNames((fileNames) => [...fileNames, info.icon.name]);
      }
    });
  }, []);

  return (
    <div className="w-full h-full flex">
      <IconsListSection
        icons={iconsList}
        selectedIcon={selectedIcon || iconsList[0]}
        onIconSelect={onIconSelect}
      />
      <IconDetailsSection selectedIcon={selectedIcon} />
    </div>
  );
};

export { IconsHome as default };
