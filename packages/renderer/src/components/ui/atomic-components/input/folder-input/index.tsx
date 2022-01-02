import type { ReactElement } from 'react';
import { ReactComponent as FolderIcon } from '/assets/icons/folder.svg';
import { formatFolderPath } from './utils';
import { Input } from '..';
import { Button } from '../../button';

export const FolderInput = ({
  folderPath,
  disabled,
  onChange,
}: {
  folderPath: string;
  disabled: boolean;
  onChange: (path: string) => void;
}): ReactElement => {
  const onChangeBtnClick = () => {
    const filePaths = window.electron.ipcRenderer.sendSync('select-folder');

    const chosenFolderPath = filePaths[0];
    if (chosenFolderPath) {
      onChange(chosenFolderPath);
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
        <Button onClick={onChangeBtnClick} disabled={disabled}>
          Change
        </Button>
      </div>
    </>
  );
};
