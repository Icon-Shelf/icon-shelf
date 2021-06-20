import React, { FC } from 'react';
import { Icon } from 'data/icons';
import { formatFileName } from 'utils/formatFileName';

interface Props {
  icon: Icon;
  isSelected: boolean;
  onIconSelect: (icon: Icon) => void;
}

export const IconItem: FC<Props> = ({ icon, isSelected, onIconSelect }) => {
  return (
    <li className="relative flex flex-col-reverse">
      <h3
        className="text-gray-600 w-full truncate"
        title={formatFileName(icon.name)}
      >
        {formatFileName(icon.name)}
      </h3>

      <div className="relative mb-3 h-24">
        <button
          type="button"
          onClick={() => onIconSelect(icon)}
          className={`absolute inset-0 w-full flex items-center justify-center rounded-lg border border-gray-200 focus:outline-none  focus:ring-2 ${
            isSelected ? 'ring-2 ring-indigo-400' : ''
          }`}
        >
          <img
            src={icon.imageSrc}
            alt=""
            className={`${
              !icon.isInStorage ? 'opacity-50' : 'opacity-100'
            } w-16 object-contain`}
          />
        </button>
        {!icon.isInStorage && (
          <div className="absolute bottom-0 right-0 m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}
      </div>
    </li>
  );
};
