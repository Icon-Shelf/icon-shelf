import React, { FC, ChangeEvent, useRef } from 'react';
import { IconsApi } from 'data/icons';
import { Modal } from '../atomic-components/modal/index';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const IconUploadDialog: FC<Props> = ({ isOpen, onClose }) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const onIconUpload = (event?: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      return;
    }
    const files = [...event.target.files];

    files.forEach((file) => {
      const icon = {
        name: file.name,
        format: 'svg',
        biteSize: file.size,
        imageSrc: '',
      };

      IconsApi.uploadIcon(icon, file);
    });
  };

  const onUploadIconClick = () => {
    inputFile.current?.click();
  };

  return (
    <Modal show={isOpen} onClose={onClose} title="Upload icon">
      <button
        type="button"
        className="mt-2 flex items-center justify-center h-64 border-2 border-dashed p-12 cursor-pointer outline-none hover:border-indigo-300 hover:text-indigo-500"
        tabIndex={0}
        onClick={onUploadIconClick}
      >
        <svg
          className="h-10 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        <input
          ref={inputFile}
          type="file"
          multiple
          accept="image/*"
          name="icon-uploaded"
          onChange={onIconUpload}
          className="hidden"
        />
      </button>
    </Modal>
  );
};
