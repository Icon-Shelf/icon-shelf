import React, { FC, useState } from 'react';
import { IconUploadDialog } from '../IconUploadDialog';

export const TopSection: FC = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <>
      <div className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
        <div>Icon Manager</div>
        <div>
          <button
            type="button"
            className="h-8 w-8 bg-indigo-700 rounded-full flex items-center justify-center text-white text-xl cursor-pointer hover:bg-indigo-800"
            onClick={() => setIsUploadDialogOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
      <IconUploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
      />
    </>
  );
};
