import type { FC } from 'react';
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
interface modal {
    showModal: boolean,
    setShowModal: (newValue: boolean) => void;
    onSelectColor: (newValue: string) => void;
    color: string
}

export const ColorPickerModal: FC<React.PropsWithChildren<modal>> = ({ showModal, setShowModal, color, onSelectColor }) => {

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setShowModal}>
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
                        <Dialog.Overlay className="fixed inset-0  bg-black1 bg-opacity-80 dark:bg-modalOverlay dark:bg-opacity-80" />
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
                    >
                        <div
                            className={`relative p-6 inline-block w-full max-w-sm rounded-lg bg-white text-left align-middle shadow-xl transition-all dark:bg-black2`}
                        >
                            <Dialog.Title
                                as="h3"
                                className="border-b border-black3 px-8 py-5 text-xl font-medium leading-6 text-black dark:text-white"
                            >Color</Dialog.Title>
                            <div className='mt-4 flex flex-col'>
                                <HexColorPicker
                                    className="self-center"
                                    color={color}
                                    onChange={onSelectColor}
                                />
                                <HexColorInput
                                    className="mt-4 mb-4 block w-full h-10 px-4 rounded-lg bg-transparent border-2 border-inputBorder outline-none transition-shadow	focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 text-body dark:text-white"
                                    color={color}
                                    onChange={onSelectColor}
                                />
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
