import { ReactElement } from 'react';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

export const Input = ({
  name,
  className,
  id,
  placeholder,
}: {
  name: string;
  className?: string;
  placeholder?: string;
  id?: string;
}): ReactElement => {
  return (
    <input
      type="text"
      name={name}
      id={id}
      className={`block w-full h-10 px-7 rounded-lg bg-transparent border-2 border-inputBorder outline-none transition-shadow	focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 text-white ${className}`}
      placeholder={placeholder}
    />
  );
};

const Search = ({
  name,
  placeholder,
  className,
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
