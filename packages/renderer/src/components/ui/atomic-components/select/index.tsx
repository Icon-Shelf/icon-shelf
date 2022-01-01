/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ReactComponent as CheckIcon } from "/assets/icons/check.svg";
import { ReactComponent as SelectorIcon } from "/assets/icons/selector.svg";

interface Props {
  className?: string;
  selected: (any & { name: string }) | null;
  options?: any[];
  onChange: (item: any) => void;
}

export const Select: FC<Props> = ({
  className = "",
  selected: selectedVal,
  options,
  onChange,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Listbox value={selectedVal} onChange={onChange}>
        <div className="relative my-1">
          <Listbox.Button className="relative w-full h-11 py-2 pl-3 pr-10 text-left bg-transparent rounded-lg border-2 border-inputBorder outline-none transition-shadow	focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 text-white">
            <span className="block truncate">{selectedVal?.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-600 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 border border-gray-600 outline-none">
              {options?.map((option) => (
                <Listbox.Option
                  key={option.name}
                  className={({ active }) =>
                    `${active ? "bg-black2 text-white" : "text-gray-200"}
              text-white cursor-default select-none outline-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                          absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
