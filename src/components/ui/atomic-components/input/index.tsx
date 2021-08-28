import { ReactElement, ReactNode } from 'react';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

export const Input = ({
  name,
  className = '',
  id,
  placeholder,
  icon,
}: {
  name?: string;
  className?: string;
  placeholder?: string;
  id?: string;
  icon?: ReactNode;
}): ReactElement => {
  return (
    <div className={`relative w-full ${className}`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{icon}</span>
        </div>
      )}
      <input
        type="text"
        name={name}
        id={id}
        className={`block w-full h-10 px-4 rounded-lg bg-transparent border-2 border-inputBorder outline-none transition-shadow	focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 text-white ${
          icon && 'pl-10'
        } ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

const Search = ({
  name,
  placeholder,
  className = '',
}: {
  name: string;
  placeholder?: string;
  className?: string;
}): ReactElement => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">
          <SearchIcon />
        </span>
      </div>
      <Input name={name} placeholder={placeholder} className="pl-10" />
    </div>
  );
};

Input.Search = Search;
