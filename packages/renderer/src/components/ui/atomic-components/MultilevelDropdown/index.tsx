/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MouseEvent, ReactNode } from "react";
import { useState, useRef, useCallback } from "react";

import Item from "./Item";
import Submenu from "./Submenu";
import "./styles.css";

interface Props {
  title?: ReactNode | ReactNode[];
  isDisabled?: boolean;
  position?: "left" | "right" | "top-right" | "top-left";
  isActive?: boolean;
  wrapperClassName?: string;
  menuClassName?: string;
  buttonClassName?: string;
  onClick?: (x?: any) => any | null;
  openOnHover?: boolean;
  children: ReactNode;
}

export const MultilevelDropdown = ({
  title,
  children,
  isDisabled,
  position,
  wrapperClassName,
  buttonClassName,
  menuClassName,
  ...props
}: Props) => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: Event) => {
    setOpen(false);

    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleButtonOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setOpen(!isOpen);

    if (!isOpen) {
      document.addEventListener("mousedown", handleClick, { once: true });
    } else {
      document.addEventListener("mousedown", handleClick);
    }
  };

  return (
    <div className={`multi-dropdown ${wrapperClassName}`} ref={dropdownRef}>
      <button
        className={`multi-dropdown-button ${buttonClassName}`}
        disabled={isDisabled}
        tabIndex={0}
        onMouseDown={handleButtonOnClick}
        {...props}
      >
        {title}
      </button>
      {isOpen && (
        <div
          className={`multi-dropdown--menu multi-dropdown--menu-${position} ${menuClassName}`}
        >
          <ul>{children}</ul>
        </div>
      )}
    </div>
  );
};

MultilevelDropdown.Item = Item;
MultilevelDropdown.Submenu = Submenu;
