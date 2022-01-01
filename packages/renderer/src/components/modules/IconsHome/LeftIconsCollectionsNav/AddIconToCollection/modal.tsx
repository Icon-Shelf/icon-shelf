import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Spinner,
} from "/@/components/ui/atomic-components";
import { ReactComponent as UploadIcon } from "/assets/icons/upload.svg";
import type { ImageListType } from "react-images-uploading";
import ImageUploading from "react-images-uploading";
import { ReactComponent as DocumentIcon } from "/assets/icons/document.svg";
import type { Collection } from "/@/data/collections";
import { CollectionsApi } from "/@/data/collections";
import { useParams } from "react-router-dom";
import { CollectionsDropdown } from "./CollectionsDropdown";

interface Props {
  show: boolean;
  onClose: () => void;
}

export const AddIconToCollectionModal: FC<Props> = ({ show, onClose }) => {
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [showLoader, setShowLoader] = useState(false);

  const [optimizeIcon, setOptimizeIcon] = useState<boolean>(
    localStorage.getItem("optimizeIcon") === "true"
  );

  const { collectionId = "" } = useParams();

  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const [uploadedIcons, setUploadedIcons] = useState<ImageListType>([]);

  const onChange = (iconsList: ImageListType) => {
    setUploadedIcons(iconsList);

    addButtonRef.current?.focus();
  };

  const onCollectionChange = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  const onAdd = () => {
    if (uploadedIcons.length && selectedCollection) {
      setShowLoader(true);

      // add icons to collection folder
      window.electron.ipcRenderer.send("create-and-add-icon-to-folder", {
        uploadedIcons: uploadedIcons.map((icon) => ({
          dataURL: icon.dataURL,
          fileName: icon.file?.name,
        })),
        folderPath: selectedCollection.folderSrc,
        optimizeIcon,
      });

      setTimeout(() => {
        setShowLoader(false);
        onClose();
      }, 1500);
    }
  };

  const afterClose = () => {
    setUploadedIcons([]);
    setShowLoader(false);
  };

  useEffect(() => {
    const parsedCollectionId = parseInt(collectionId);
    if (parsedCollectionId) {
      CollectionsApi.find(parseInt(collectionId)).then(
        (collection) => collection && setSelectedCollection(collection)
      );
    }
  }, [collectionId]);

  return (
    <Modal
      show={show}
      title="Add icons to collection"
      onClose={onClose}
      afterClose={afterClose}
      footer={
        <Button type="primary" onClick={onAdd} ref={addButtonRef}>
          {showLoader && <Spinner className="mr-2" />}
          Add
        </Button>
      }
    >
      <div>
        <CollectionsDropdown
          selectedCollection={selectedCollection}
          onChange={onCollectionChange}
        />

        <ImageUploading
          multiple
          value={uploadedIcons}
          onChange={onChange}
          maxNumber={69}
          acceptType={["svg"]}
        >
          {({ imageList, onImageUpload, isDragging, dragProps }) => (
            <div
              className={`w-full flex flex-col items-center justify-center outline-none border-2 border-gray-500 border-dashed rounded-md py-14 hover:border-gray-400 ${
                isDragging && "border-primary"
              }`}
              onClick={onImageUpload}
              role="button"
              onKeyDown={() => {}}
              tabIndex={-1}
              {...dragProps}
            >
              {!imageList.length && (
                <UploadIcon className="pointer-events-none" />
              )}

              {imageList.length > 0 && (
                <div className="flex items-center gap-1">
                  <DocumentIcon className="pointer-events-none" />
                  <span className="text-white text-lg">
                    {imageList.length}{" "}
                    {imageList.length === 1 ? "icon" : "icons"} chosen
                  </span>
                </div>
              )}

              {!imageList.length && (
                <div className="flex flex-col items-center pointer-events-none">
                  <span className="text-sm text-white">
                    Drag and drop your SVG icons here
                  </span>

                  <button
                    className="text-xs hover:text-white focus:text-white"
                    type="button"
                  >
                    or click to browse your files
                  </button>
                </div>
              )}
            </div>
          )}
        </ImageUploading>

        <div className="mt-4">
          <Checkbox
            checked={optimizeIcon}
            label={
              <>
                SVGO optimize icon.{" "}
                <a
                  className="text-blue-300 text-xs hover:text-blue-400"
                  href="https://github.com/svg/svgo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more
                </a>
              </>
            }
            onChange={(val) => {
              setOptimizeIcon(val);
              localStorage.setItem("optimizeIcon", String(val));
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
