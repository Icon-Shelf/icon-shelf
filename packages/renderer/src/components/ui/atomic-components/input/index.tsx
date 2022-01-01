import type { ChangeEvent, HTMLProps, ReactElement, ReactNode } from "react";
import { ReactComponent as SearchIcon } from "/assets/icons/search.svg";
import { FolderInput } from "./folder-input";

interface InputProps extends HTMLProps<HTMLInputElement> {
  name?: string;
  className?: string;
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
  value?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  name,
  className = "",
  id,
  placeholder,
  icon,
  value,
  ...rest
}: InputProps): ReactElement => {
  return (
    <div className={`relative w-full ${className}`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{icon}</span>
        </div>
      )}
      <input
        type="text"
        id={id}
        name={name}
        className={`block w-full h-10 px-4 rounded-lg bg-transparent border-2 border-inputBorder outline-none transition-shadow	focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 text-white ${
          icon && "pl-10"
        }`}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
    </div>
  );
};

const Search = (props: InputProps): ReactElement => {
  return <Input icon={<SearchIcon />} {...props} />;
};

Input.Search = Search;

Input.FolderInput = FolderInput;
