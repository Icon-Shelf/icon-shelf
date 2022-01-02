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

export const Modal: FC<Props> = ({
  show,
  title,
  className = '',
  children,
  footer,
  onClose,
  afterClose,
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-modalOverlay bg-opacity-80" />
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
            afterLeave={afterClose}
          >
            <div
              className={`inline-block w-full max-w-xl text-left align-middle transition-all bg-black2 shadow-xl rounded-lg relative ${className}`}
            >
              <Dialog.Title
                as="h3"
                className="text-xl font-medium leading-6 text-white px-8 py-5 border-b border-black3"
              >
                {title}
              </Dialog.Title>

              <div className="p-8 pb-12">{children}</div>

              <div className="px-4 py-5 w-full flex justify-end gap-3 border-t border-black3">
                {footer}
              </div>

              <button
                className="absolute top-0 right-0 p-2 m-1 outline-none rounded-lg hover:text-white active:text-current focus:text-white focus-visible:ring-2 focus-visible:ring-primary"
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
