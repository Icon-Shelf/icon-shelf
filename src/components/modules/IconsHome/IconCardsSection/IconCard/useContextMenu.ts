import { useEffect, useCallback, RefObject } from 'react';
import { ipcRenderer } from 'electron';
import { Icon } from 'data/icons';

export const useContextMenu = (
  domRef: RefObject<HTMLButtonElement>,
  icon: Icon
) => {
  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      ipcRenderer.send('icon-show-context-menu', {
        iconId: icon.id,
        fileName: `${icon.name}.${icon.mime}`,
        collectionId: icon.collectionId,
      });
    },
    [icon]
  );

  useEffect(() => {
    const dom = domRef.current;
    dom?.addEventListener('contextmenu', handleContextMenu);
    return () => {
      dom?.removeEventListener('contextmenu', handleContextMenu);
    };
  });
};
