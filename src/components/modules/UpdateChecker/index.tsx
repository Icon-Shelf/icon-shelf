import { Button, Modal } from 'components/ui/atomic-components';
import { FC, useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

export const UpdateChecker: FC = ({ children }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const onUpdateClick = () => {
    window.open('https://github.com/MrRobz/icon-shelf/releases/latest', '_blank');
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://api.github.com/repos/MrRobz/icon-shelf/releases/latest'
      );
      if (response.ok) {
        const data = await response.json();
        const latestTag = data.tag_name;

        const currentAppVersion = ipcRenderer.sendSync('get-current-app-version');

        const formattedLatestVersion = latestTag.replaceAll(/v|\./g, '');
        const formattedCurrentVersion = currentAppVersion.replaceAll(/\./g, '');

        if (parseInt(formattedLatestVersion) > parseInt(formattedCurrentVersion)) {
          setShowUpdateModal(true);
        }
      }
    })();
  }, []);

  return (
    <>
      {children}
      <Modal
        show={showUpdateModal}
        title="Update available"
        onClose={() => setShowUpdateModal(false)}
        className="w-52"
        footer={
          <Button type="primary" onClick={onUpdateClick}>
            Update
          </Button>
        }
      >
        <p>
          A newer version of Icon Shelf has been released. Please download and install this to get
          all the latest features and bug fixes.
        </p>
      </Modal>
    </>
  );
};
