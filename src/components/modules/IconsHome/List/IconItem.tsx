import React, { FC } from 'react';
import { Icon } from '../../../../data/icons';

interface Props {
  icon: Icon;
  isSelected: boolean;
  onIconSelect: (icon: Icon) => void;
}

export const IconItem: FC<Props> = ({ icon, isSelected, onIconSelect }) => {
  return (
    <li className="relative flex flex-col-reverse">
      <h3 className="text-gray-600 w-full truncate" title={icon.name}>
        {icon.name}
      </h3>

      <div className="relative mb-3 h-24">
        <button
          type="button"
          onClick={() => onIconSelect(icon)}
          className={`absolute inset-0 w-full flex items-center justify-center rounded-lg border border-gray-200 focus:outline-none  focus:ring-2 ${
            isSelected ? 'ring-2 ring-indigo-400' : ''
          }`}
        >
          <img src={icon.imageSrc} alt="" className="w-16 object-contain" />
        </button>
      </div>
    </li>
  );
};
