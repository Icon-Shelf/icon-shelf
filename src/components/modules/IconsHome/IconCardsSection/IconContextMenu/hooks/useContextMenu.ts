import { useEffect, useCallback, useState, MouseEvent } from 'react';

export const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [clickedIconId, setClickedIconId] = useState<string | null>(null);

  const handleContextMenu = useCallback(
    (evt: Event) => {
      const event = evt as unknown as MouseEvent;

      const clickedIconCard = (event.target as HTMLButtonElement).closest(
        '[data-icon-card-id]'
      );

      if (clickedIconCard) {
        event.preventDefault();

        setAnchorPoint({
          x: event.pageX,
          y: event.pageY,
        });
        setClickedIconId(clickedIconCard.getAttribute('data-icon-card-id'));
      }
    },
    [setClickedIconId, setAnchorPoint]
  );

  const handleClick = useCallback(
    () => (clickedIconId ? setClickedIconId(null) : null),
    [clickedIconId]
  );

  useEffect(() => {
    const dom = document;

    dom?.addEventListener('click', handleClick);
    dom?.addEventListener('contextmenu', handleContextMenu);

    return () => {
      dom?.removeEventListener('click', handleClick);
      dom?.removeEventListener('contextmenu', handleContextMenu);
    };
  });
  return { anchorPoint, clickedIconId };
};
