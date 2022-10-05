/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import type { HTMLProps, ReactNode } from 'react';
import { forwardRef } from 'react';
import './styles.css';

interface Props {
  type?: 'primary' | 'default' | 'text' | 'link' | 'danger' | 'link';
  size?: 'large' | 'default' | 'small';
  danger?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  btnType?: 'submit' | 'reset' | 'button';
  children?: ReactNode;
}
export const Button = forwardRef<HTMLButtonElement, Props & HTMLProps<HTMLButtonElement>>(
  ({ children, icon, type = 'default', className = '', btnType = 'button', ...rest }, ref) => {
    return (
      <button type={btnType} className={`btn btn-${type} ${className}`} ref={ref} {...rest}>
        {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button atom';
