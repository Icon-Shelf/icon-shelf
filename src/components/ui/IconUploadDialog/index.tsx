import React, { FC, ChangeEvent, useRef, useState } from 'react';
import { IconsApi } from 'data/icons';
import firebase from 'firebase';
import { Modal } from '../atomic-components/modal/index';
import { BeforeUploadComp } from './BeforeUploadComp';
import { OnUploadingComp } from './OnUploadingComp';
import { OnUploadSuccessComp } from './OnUploadSuccessComp';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const IconUploadDialog: FC<Props> = ({ isOpen, onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const onIconUpload = async (event?: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      return;
    }
    const files = [...event.target.files];
    const promiseArray: Promise<void>[] = [];

    setIsUploading(true);
    files.forEach((file) => {
      const icon = {
        name: file.name,
        format: 'svg',
        byteSize: file.size,
        imageSrc: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      promiseArray.push(IconsApi.uploadIcon(icon, file));
    });

    await Promise.all(promiseArray);

    setIsUploading(false);
    setIsUploadSuccess(true);
  };

  const onModalClose = () => {
    setIsUploading(false);
    setIsUploadSuccess(false);

    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onModalClose} title="Upload icon">
      {!isUploading && !isUploadSuccess && (
        <BeforeUploadComp onIconUpload={onIconUpload} />
      )}
      {isUploading && <OnUploadingComp />}
      {!isUploading && isUploadSuccess && <OnUploadSuccessComp />}
    </Modal>
  );
};
