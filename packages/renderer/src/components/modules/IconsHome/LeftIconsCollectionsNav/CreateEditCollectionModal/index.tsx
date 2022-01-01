import type { FC } from "react";
import { useState, useEffect } from "react";
import { Input, Modal, Button } from "/@/components/ui/atomic-components";
import type { Collection } from "/@/data/collections";
import { CollectionsApi } from "/@/data/collections/api";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Tooltip from "rc-tooltip";
import { ReactComponent as InfoIcon } from "/assets/icons/information-circle-16.svg";

const { FolderInput } = Input;

function uuidv4() {
  return "xxxxx".replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface Props {
  show: boolean;
  collection?: Collection | null;
  onClose: () => void;
}

export const CreateEditCollectionModal: FC<Props> = ({
  show,
  collection,
  onClose,
}) => {
  const queryClent = useQueryClient();
  const navigate = useNavigate();

  const [collectionName, setCollectionName] = useState(collection?.name || "");

  const [folderLoc, setFolderLoc] = useState(
    collection?.folderSrc ||
      `${window.electron.ipcRenderer.sendSync(
        "get-default-icon-storage-folder"
      )}/collection-${uuidv4()}`
  );

  const onSubmit = () => {
    if (!collection?.id) {
      const updatedCollection: Collection = {
        name: collectionName,
        folderSrc: folderLoc,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        actions: [],
      };

      return CollectionsApi.create(updatedCollection).then(
        async (newCollectionId) => {
          await queryClent.invalidateQueries("collections-list");
          onClose();
          navigate(`/collections/${newCollectionId}`);
        }
      );
    }

    const updatedCollection: Partial<Collection> = {
      name: collectionName,
      updatedAt: Date.now(),
    };

    return CollectionsApi.update(collection.id, updatedCollection).then(
      async () => {
        await queryClent.invalidateQueries("collections-list");
        onClose();
      }
    );
  };

  const afterModalClose = () => {
    setCollectionName("");
    setFolderLoc(
      `${window.electron.ipcRenderer.sendSync(
        "get-default-icon-storage-folder"
      )}/collection-${uuidv4()}`
    );
  };

  useEffect(() => {
    setCollectionName(collection?.name || "");
    if (collection) setFolderLoc(collection.folderSrc);
  }, [collection]);

  return (
    <Modal
      show={show}
      title={collection?.id ? "Update collection" : "Create a new collection"}
      onClose={onClose}
      footer={
        <Button type="primary" onClick={onSubmit}>
          {collection?.id ? "Update" : "Create"}
        </Button>
      }
      afterClose={afterModalClose}
    >
      <div>
        <label>
          <div className="mb-2 font-medium text-gray-400">
            Enter a name for the collection
          </div>
          <Input
            id="collection-name"
            className="mb-6"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </label>

        <label id="folder-label-container">
          <div className="mb-2 font-medium text-gray-400 focus-within:text-white">
            Folder where your icons will reside
            <Tooltip
              placement="right"
              overlay={
                <span>
                  You can even select an existing folder <br /> with icons in
                  it.
                </span>
              }
            >
              <span className="ml-1">
                <InfoIcon className="inline" />
              </span>
            </Tooltip>
          </div>

          <FolderInput
            folderPath={folderLoc}
            disabled={!!collection?.id}
            onChange={(path) => setFolderLoc(path)}
          />
        </label>
      </div>
    </Modal>
  );
};
