import { FC, Dispatch, SetStateAction } from 'react';
import { Icon } from 'data/icons/types';
import SVG from 'react-inlinesvg';

interface Props {
  icon: Icon;
  isSelected: boolean;
  setSelectedIcon: Dispatch<SetStateAction<Icon | null>>;
}

export const IconCard: FC<Props> = ({ icon, isSelected, setSelectedIcon }) => {
  return (
    <button
      className="w-full h-full min-w-full min-h-full flex items-center justify-center rounded-2xl cursor-pointer outline-none"
      style={{
        minHeight: '8rem',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        background: isSelected
          ? 'linear-gradient(180deg, #696EFF 0%, #F7ABFF 100%)'
          : '',
      }}
      type="button"
      onClick={() => setSelectedIcon(icon)}
    >
      <div
        className="rounded-2xl bg-black2 flex flex-col items-center justify-center"
        style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
      >
        <SVG src={icon.imageSrc} className="h-10 w-10 mt-4 text-white" />

        <div
          className="mt-4 h-6 w-4/5 text-gray-400 text-sm text-center whitespace-nowrap overflow-hidden overflow-ellipsis"
          title={icon.name}
        >
          {icon.name}
        </div>
      </div>
    </button>
  );
};