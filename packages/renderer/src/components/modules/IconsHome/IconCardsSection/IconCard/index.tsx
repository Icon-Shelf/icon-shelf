import type { FC, Dispatch, SetStateAction, DragEvent } from 'react';
import type { Icon } from '/@/data/icons/types';
import { IconDisplay } from '/@/components/ui/atomic-components';
import './style.css';

interface Props {
  icon: Icon;
  isSelected: boolean;
  setSelectedIcon?: Dispatch<SetStateAction<Icon | null>>;
  color: string | null | undefined;
}

export const IconCard: FC<React.PropsWithChildren<Props>> = ({
  icon,
  isSelected,
  setSelectedIcon,
  color,
}) => {
  const onDragStart = async (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'copy';

    window.electron.ipcRenderer.send('drag-icon-start', [icon.imageSrc]);
  };

  return (
    <button
      className="icon-card-wrapper flex h-full min-h-full w-full min-w-full cursor-pointer items-center justify-center rounded-2xl outline-none"
      style={{
        minHeight: '8rem',
        background: isSelected ? 'linear-gradient(180deg, #696EFF 0%, #F7ABFF 100%)' : '',
      }}
      type="button"
      draggable
      data-is-selected={isSelected}
      data-icon-card-id={icon.id}
      onDragStart={onDragStart}
      onClick={() => setSelectedIcon?.(icon)}
    >
      <div
        className="flex flex-col items-center justify-center rounded-2xl border border-transparent bg-gray-200 hover:border-gray-400 dark:bg-black2 hover:dark:border-gray-600"
        style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
      >
        <IconDisplay
          src={icon.imageSrc}
          color={color}
          lastUpdatedAt={icon.updatedAt}
          className="mt-4 h-10 w-10 bg-black text-black dark:bg-white dark:text-white"
        />

        <div
          className="mt-4 h-6 w-4/5 overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-sm text-body dark:text-gray-400"
          title={icon.name}
        >
          {icon.name}
        </div>
      </div>
    </button>
  );
};
