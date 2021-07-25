/* eslint-disable react/jsx-props-no-spreading */
import { FC, ReactNode } from 'react';

interface Props {
  type?: 'primary' | 'default' | 'text' | 'link';
  size?: 'large' | 'default' | 'small';
  danger?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
}
export const Button: FC<Props> = ({
  children,
  icon,
  type = 'default',
  className,
  ...rest
}) => {
  if (type === 'primary') {
    return (
      <button
        type="button"
        className={`flex items-center justify-center outline-none rounded-md px-12 py-3 text-white transition-shadow bg-primary hover:bg-purple-700 active:bg-purple-800 ring-offset-2 ring-offset-black2 focus:ring-2 focus:ring-primary ${className}`}
        {...rest}
      >
        {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
        {children}
      </button>
    );
  }
  if (type === 'text') {
    return (
      <button
        type="button"
        className={`flex items-center justify-center outline-none rounded-sm text-body transition-shadow hover:text-white p-1 hover:bg-gray-800 active:text-body active:ring-0 focus:ring-2 focus:ring-primary ${className}`}
        {...rest}
      >
        {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
        {children}
      </button>
    );
  }
  return (
    <button
      type="button"
      className={`flex items-center justify-center outline-none rounded-md text-white bg-black2 px-4 py-1 transition-shadow hover:text-white p-1 hover:bg-gray-800 active:bg-gray-900 active:ring-0 focus:ring-2 focus:ring-primary ${className}`}
      {...rest}
    >
      {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
      {children}
    </button>
  );
};
