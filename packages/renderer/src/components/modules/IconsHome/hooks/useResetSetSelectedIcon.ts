import type { SetStateAction } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import type { Icon } from '/@/data/icons';

export const useResetSetSelectedIcon = ({
  collectionId,
  setSelectedIcon,
}: {
  collectionId: string;
  setSelectedIcon: (value: SetStateAction<Icon | null>) => void;
}) => {
  const prevCollectionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (collectionId !== prevCollectionIdRef.current) {
      setSelectedIcon(null);

      prevCollectionIdRef.current = collectionId;
    }
  }, [collectionId, setSelectedIcon]);
};
