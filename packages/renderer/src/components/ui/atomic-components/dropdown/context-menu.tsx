import type { PropsWithChildren, FC, CSSProperties, HTMLAttributes } from 'react';

interface Props {
  style?: CSSProperties;
}

export const ContextMenu = ({ style, children }: PropsWithChildren<Props>) => {
  return (
    <div
      style={style}
      className="absolute w-max mt-2 bg-gray-600 rounded-md shadow-lg ring-1 ring-white ring-opacity-20 z-50 focus:outline-none cursor-pointer"
    >
      {children}
    </div>
  );
};

const ContextMenuItem: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return (
    <div className="px-1 py-1 border-b border-gray-400 last:border-b-0" {...rest}>
      <div>
        <button
          type="button"
          className="text-gray-200 group flex rounded-md items-center w-full outline-none px-2 py-2 text-sm hover:bg-black2 hover:text-white"
        >
          {children}
        </button>
      </div>
    </div>
  );
};

ContextMenu.Item = ContextMenuItem;
