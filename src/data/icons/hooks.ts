import { checkIfAnyNewIconsInFolder } from 'data/icons';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

export const useCheckIfAnyNewIconsInFolder = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    checkIfAnyNewIconsInFolder(queryClient);
  }, [queryClient]);
};
