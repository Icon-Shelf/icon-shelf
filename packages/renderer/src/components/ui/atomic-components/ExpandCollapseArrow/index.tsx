import type { FC } from 'react';
import { ReactComponent as CheveronDownIcon } from '/assets/icons/cheveron-down.svg';
import { ReactComponent as CheveronRightIcon } from '/assets/icons/cheveron-right.svg';

interface Props {
  isOpen: boolean;
  onChange?: (v: boolean) => void;
}
export const ExpandCollapseArrow: FC<React.PropsWithChildren<Props>> = ({ isOpen, onChange }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange?.(!isOpen);
      }}
    >
      {isOpen ? <CheveronDownIcon /> : <CheveronRightIcon />}
    </button>
  );
};
