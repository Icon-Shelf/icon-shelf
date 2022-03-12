import { useEffect, useRef, useState } from 'react';

export const useYOffset = (
  parentDom: HTMLDivElement,
  clickedIconId: string | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  anchorPoint: any
) => {
  const initialScrollTop = useRef(parentDom.scrollTop);
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setYOffset(parentDom.scrollTop - initialScrollTop.current);
    };

    parentDom.addEventListener('scroll', onScroll);

    () => {
      parentDom.removeEventListener('scroll', onScroll);
    };
  }, [parentDom]);

  useEffect(() => {
    setYOffset(0);
    initialScrollTop.current = parentDom.scrollTop;
  }, [clickedIconId, parentDom, anchorPoint]);

  return yOffset;
};
