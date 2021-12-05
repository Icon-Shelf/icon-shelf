import { ChangeEvent, HTMLProps, ReactElement, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLTextAreaElement> {
  name?: string;
  className?: string;
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  name,
  className = '',
  id,
  placeholder,
  icon,
  value,
  ...rest
}: Props): ReactElement => {
  return (
    <textarea
      id={id}
      name={name}
      rows={3}
      className={`block w-full p-4 rounded-lg bg-transparent border-2 border-inputBorder outline-none transition-shadow	focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 text-white ${className}`}
      placeholder={placeholder}
      value={value}
      {...rest}
    />
  );
};
