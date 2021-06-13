import React, { FC, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../ui/atomic-components/modal/index';

export const ConfigureDownloadPathModal: FC = () => {
  const history = useHistory();

  const onFolderSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    const file = element.files && element.files[0];
    if (file) {
      const { path, name } = file;
      const folderPath = path.substring(0, path.length - name.length);

      localStorage.setItem('iconsLocalStorageLoc', folderPath);
      history.replace('/icons');
    }
  };

  return (
    <Modal
      show
      title="On what folder do you want the downloaded icons to be stored?"
      onClose={() => {}}
    >
      <div className="mt-8 flex flex-col items-center justify-center">
        <span className="text-gray-500 text-base mb-8">
          Please create one temporary file in the folder for the below input to
          work. (we are working on improving this.)
        </span>
        <input
          className="w-1/2"
          id="path-picker"
          type="file"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: webkit only tag
          webkitdirectory="true"
          onChange={onFolderSelect}
        />
      </div>
    </Modal>
  );
};
