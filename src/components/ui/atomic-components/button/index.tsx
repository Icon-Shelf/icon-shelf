import { FC, ReactNode } from 'react';

interface Props {
  type?: 'primary' | 'default' | 'text' | 'link';
  size?: 'large' | 'default' | 'small';
  danger?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
}
export const Button: FC<Props> = ({
  children,
  icon,
  type = 'default',
  ...rest
}) => {
  if (type === 'primary') {
    return (
      <button {...rest}>
        {icon}
        {children}
      </button>
    );
  } else if (type === 'text') {
    if (!children && icon) {
      return (
        <button
          className="outline-none flex gap-1 text-body rounded-sm hover:text-white hover:bg-gray-800 p-1 active:text-body"
          {...rest}
        >
          {icon}
        </button>
      );
    }
    return (
      <button
        className="flex text-body outline-none hover:text-white hover:bg-gray-800 p-1 rounded-sm"
        {...rest}
      >
        {icon}
        {children}
      </button>
    );
  } else {
    return <button {...rest}>{children}</button>;
  }
};
