import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { Popover as HeadlessPopover, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';

interface Props {
  overlay: ReactNode;
}

export const Popover: FC<React.PropsWithChildren<Props>> = ({ children, overlay }) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  });

  return (
    <HeadlessPopover className="relative">
      {() => (
        <>
          <HeadlessPopover.Button as={'div'} ref={setReferenceElement}>
            {children}
          </HeadlessPopover.Button>

          <Transition
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <HeadlessPopover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <div className="mt-2 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-black2 dark:ring-slate-700">
                {overlay}
              </div>
            </HeadlessPopover.Panel>
          </Transition>
        </>
      )}
    </HeadlessPopover>
  );
};
