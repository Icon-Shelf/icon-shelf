import { FC, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from 'components/ui/atomic-components';

interface Props {
  show: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const DeleteConfirmModal: FC<Props> = ({
  show,
  title,
  children,
  onClose,
  onSubmit,
}) => {
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
        initialFocus={deleteBtnRef}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-modalOverlay bg-opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
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
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-black2 shadow-xl rounded-2xl border border-gray-600">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-white"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">{children}</div>

              <div className="flex items-end justify-end w-full mt-4 gap-2">
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  type="danger"
                  btnType="submit"
                  ref={deleteBtnRef}
                  onClick={onSubmit}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
