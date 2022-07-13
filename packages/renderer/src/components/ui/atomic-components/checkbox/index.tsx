import type { FC, ChangeEvent, ReactNode } from 'react';
import './styles.css';

export const Checkbox: FC<React.PropsWithChildren<{
  defaultChecked?: boolean;
  label: ReactNode;
  checked?: boolean;
  onChange: (val: boolean) => void;
}>> = ({ checked, label, defaultChecked, onChange }) => {
  const checkBoxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    onChange(value);
  };

  return (
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        name="checked-demo"
        defaultChecked={defaultChecked}
        checked={checked}
        className="form-tick appearance-none h-5 w-5 border border-gray-300 rounded-md focus:outline-none"
        onChange={checkBoxInputChange}
      />
      <span className="text-body dark:text-white text-sm">{label}</span>
    </label>
  );
};
