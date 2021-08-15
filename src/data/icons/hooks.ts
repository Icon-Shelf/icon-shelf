import { checkIfAnyNewIconsInFolder } from 'data/icons';
import { useQueryClient } from 'react-query';

export const useCheckIfAnyNewIconsInFolder = () => {
  const queryClient = useQueryClient();

  checkIfAnyNewIconsInFolder(queryClient);
};
