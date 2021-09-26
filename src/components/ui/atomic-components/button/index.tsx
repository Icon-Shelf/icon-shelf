/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import { HTMLProps, ReactNode, forwardRef } from 'react';
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
}
export const Button = forwardRef<
  HTMLButtonElement,
  Props & HTMLProps<HTMLButtonElement>
>(
  (
    {
      children,
      icon,
      type = 'default',
      className = '',
      btnType = 'button',
      ...rest
    },
    ref
  ) => {
    if (type === 'primary') {
      return (
        <button
          type={btnType}
          className={`btn btn-primary ${className}`}
          ref={ref}
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
          type={btnType}
          className={`btn btn-text ${className}`}
          ref={ref}
          {...rest}
        >
          {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
          {children}
        </button>
      );
    }

    if (type === 'link') {
      return (
        <button
          type={btnType}
          className={`btn-link ${className}`}
          ref={ref}
          {...rest}
        >
          {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
          {children}
        </button>
      );
    }

    if (type === 'danger') {
      return (
        <button
          type={btnType}
          className={`btn btn-danger ${className}`}
          ref={ref}
          {...rest}
        >
          {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
          {children}
        </button>
      );
    }

    return (
      <button
        type={btnType}
        className={`btn btn-default ${className}`}
        ref={ref}
        {...rest}
      >
        {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button atom';
