import type { PropsWithChildren, FC, CSSProperties, HTMLAttributes } from 'react';

interface Props {
  style?: CSSProperties;
}

export const ContextMenu = ({ style, children }: PropsWithChildren<Props>) => {
  return (
    <div
      style={style}
      className="absolute z-50 mt-2 w-max cursor-pointer rounded-md bg-gray-600 shadow-lg ring-1 ring-white ring-opacity-20 focus:outline-none"
    >
      {children}
    </div>
  );
};

const ContextMenuItem: FC<React.PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, ...rest }) => {
  return (
    <div className="group relative border-b border-gray-400 px-1 py-1 last:border-b-0" {...rest}>
      <div>
        <div
          role="button"
          className="flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-200 outline-none hover:bg-black2 hover:text-white"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

ContextMenu.Item = ContextMenuItem;
