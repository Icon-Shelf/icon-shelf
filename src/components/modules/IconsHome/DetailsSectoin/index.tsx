import React, { FC } from 'react';
import { Icon, IconsApi } from 'data/icons';

import { ipcRenderer } from 'electron';

interface Props {
  selectedIcon: Icon | null;
}

export const IconDetailsSection: FC<Props> = ({ selectedIcon: icon }) => {
  const downloadIcons = async () => {
    if (icon) {
      const image = await fetch(icon.imageSrc);
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);
      const iconsLocalStorageLoc = localStorage.getItem('iconsLocalStorageLoc');

      ipcRenderer.send('download', {
        icon,
        url: imageURL,
        storagePath: iconsLocalStorageLoc,
      });
    }
  };

  const deleteIcon = async () => {
    if (icon) {
      IconsApi.deleteIcon(icon);
    }
  };

  return (
    <div className="w-4/12 flex flex-col bg-white border-l border-gray-200 p-5">
      <div className="h-32 flex items-center justify-center border border-gray-300 rounded-md">
        <img src={icon?.imageSrc} alt="" className="w-16 h-16" />
      </div>

      <div className="flex flex-col mt-1">
        <span className="text-2xl font-normal">{icon?.name}</span>
        <span className="text-sm text-gray-600">{icon?.biteSize} Bytes</span>
      </div>

      <div className="mt-8">
        <span className="text-gray-900 font-medium">Information</span>
        <div className="border-b border-gray-200 my-2" />

        <span className="text-gray-500 text-sm">Uploaded by</span>
        <div className="border-b border-gray-200 my-2" />

        <span className="text-gray-500 text-sm">Created</span>
        <div className="border-b border-gray-200 my-2" />

        <span className="text-gray-500 text-sm">Dimensions</span>
        <div className="border-b border-gray-200 my-2" />
      </div>

      <div className="mt-8">
        <span className="text-gray-900 font-medium">Description</span>
        <div className="text-gray-500 text-sm my-2 flex items-center">
          <span>Add some description for the icon</span>
          <span className="w-4 ml-1">
            <div>edit</div>
          </span>
        </div>
      </div>

      <div className="mt-8 flex-1 flex items-end gap-4">
        <button
          type="button"
          onClick={downloadIcons}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-indigo-500"
        >
          Download
        </button>
        <button
          type="button"
          onClick={deleteIcon}
          className="w-full inline-flex justify-center rounded-md border text-gray-800 shadow-sm px-4 py-2 bg-white text-base font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-indigo-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
