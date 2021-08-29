import { ReactElement, useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { Input, Button } from 'components/ui/atomic-components';
import { ReactComponent as FolderIcon } from 'assets/icons/folder.svg';
import { ipcRenderer } from 'electron';
import { formatFolderPath } from './utils';

export const FolderInput = ({
  defaultPath,
}: {
  defaultPath: string;
}): ReactElement => {
  const [folderPath, setFolderPath] = useState<string>(defaultPath);

  const onChangeBtnClick = () => {
    const filePaths = ipcRenderer.sendSync('select-folder');

    const chosenFolderPath = filePaths[0];
    if (chosenFolderPath) {
      setFolderPath(chosenFolderPath);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <Input
          id="collection-name"
          icon={<FolderIcon />}
          value={formatFolderPath(folderPath)}
          disabled
          aria-hidden
        />
        <Button onClick={onChangeBtnClick}>Change</Button>
      </div>
    </>
  );
};
