import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ReactComponent as CloseIcon } from '/assets/icons/close.svg';

interface Props {
  show: boolean;
  title?: string;
  onClose: () => void;
  className?: string;
  footer: ReactNode;
  afterClose?: () => void;
}

export const Modal: FC<React.PropsWithChildren<Props>> = ({
  show,
  title,
  className = '',
  children,
  footer,
  onClose,
  afterClose,
}) => {
  const onAfterClose = () => {
    afterClose?.();
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen overflow-hidden px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black1 bg-opacity-80 dark:bg-modalOverlay dark:bg-opacity-80" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            afterLeave={onAfterClose}
          >
            <div
              className={`relative inline-block w-full max-w-xl rounded-lg bg-white text-left align-middle shadow-xl transition-all dark:bg-black2 ${className}`}
            >
              <Dialog.Title
                as="h3"
                className="border-b border-black3 px-8 py-5 text-xl font-medium leading-6 text-black dark:text-white"
              >
                {title}
              </Dialog.Title>

              <div className="p-8 pb-12">{children}</div>

              <div className="flex w-full justify-end gap-3 border-t border-black3 px-4 py-5">
                {footer}
              </div>

              <button
                className="absolute top-0 right-0 m-1 rounded-lg p-2 outline-none hover:text-black focus:text-black focus-visible:ring-2 focus-visible:ring-primary active:text-current hover:dark:text-white focus:dark:text-white"
                type="button"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
