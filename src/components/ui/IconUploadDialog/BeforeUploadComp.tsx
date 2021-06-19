import React, { FC, useRef } from 'react';

interface Props {
  onIconUpload: () => void;
}

export const BeforeUploadComp: FC<Props> = ({ onIconUpload }) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const onUploadIconClick = () => {
    inputFile.current?.click();
  };

  return (
    <button
      type="button"
      className="w-full mt-2 flex items-center justify-center h-64 border-2 border-dashed p-12 cursor-pointer outline-none hover:border-indigo-300 hover:text-indigo-500"
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
  );
};
