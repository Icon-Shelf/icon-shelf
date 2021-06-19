import React, { FC } from 'react';

export const OnUploadSuccessComp: FC = () => {
  return (
    <div className="mt-4 w-full flex flex-col items-center justify-center">
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div className="mt-2 text-xl text-center font-light">
        Icon(s) uploaded successfully.
      </div>
    </div>
  );
};
