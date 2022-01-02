export const formatFolderPath = (path: string): string => {
  const pathSplit = path.split('/');

  const splitLength = pathSplit.length - 1;

  if (pathSplit.length > 2) {
    return `.../${pathSplit[splitLength - 1]}/${pathSplit[splitLength]}`;
  }

  return path;
};
