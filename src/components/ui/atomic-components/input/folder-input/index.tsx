import { ReactElement } from 'react';
// eslint-disable-next-line import/no-cycle
import { Input, Button } from 'components/ui/atomic-components';
import { ReactComponent as FolderIcon } from 'assets/icons/folder.svg';
import { ipcRenderer } from 'electron';
import { formatFolderPath } from './utils';

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
    const filePaths = ipcRenderer.sendSync('select-folder');

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
