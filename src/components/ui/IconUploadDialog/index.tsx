import React, { FC, Fragment, ChangeEvent, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconsApi } from 'data/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const IconUploadDialog: FC<Props> = ({ isOpen, onClose }) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const onIconUpload = (event?: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      return;
    }
    const files = [...event.target.files];

    files.forEach((file) => {
      const icon = {
        name: file.name,
        format: 'svg',
        biteSize: file.size,
        imageSrc: '',
      };

      IconsApi.uploadIcon(icon, file);
    });
  };

  const onUploadIconClick = () => {
    inputFile.current?.click();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30	" />
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Upload icon
              </Dialog.Title>
              <button
                type="button"
                className="mt-2 flex items-center justify-center h-64 border-2 border-dashed p-12 cursor-pointer outline-none hover:border-indigo-300 hover:text-indigo-500"
                tabIndex={0}
                onClick={onUploadIconClick}
              >
                <svg
                  className="h-10 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <input
                  ref={inputFile}
                  type="file"
                  multiple
                  accept="image/*"
                  name="icon-uploaded"
                  onChange={onIconUpload}
                  className="hidden"
                />
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
