import { useState, type ReactElement, useEffect } from 'react';
import { Button, Modal } from '../atomic-components';

export const UpdateAvailablePopup = (): ReactElement => {
  const [show, setShow] = useState(false);

  const onClose = () => {
    setShow(false);
  };

  const onLater = () => {
    setShow(false);

    const date = new Date();
    date.setDate(date.getDate() + 7);
    localStorage.setItem('hide-update-popup-till', String(date.valueOf()));
  };

  const onSubmit = () => {
    window.open('https://icon-shelf.github.io/download', '_blank');
    setShow(false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://api.github.com/repos/MrRobz/icon-shelf/releases/latest',
      ).then((res) => res.json());

      const tagName = res.tag_name;
      const latestVersionValue = tagName.substring(1).replaceAll('.', '');

      const currentAppVersion = window.electron.ipcRenderer
        .sendSync('get-app-version')
        .replaceAll('.', '');

      if (parseInt(currentAppVersion) < parseInt(latestVersionValue)) {
        const postponeUpdateTill = localStorage.getItem('hide-update-popup-till');

        if (postponeUpdateTill) {
          const postponeTillDate = new Date(parseInt(postponeUpdateTill));
          if (!isNaN(postponeTillDate as unknown as number)) {
            if (postponeTillDate < new Date()) {
              setShow(true);
            }
          }
        } else {
          setShow(true);
        }
      }
    })();
  }, []);

  return (
    <Modal
      show={show}
      title="New version of Icon Shelf available"
      onClose={onClose}
      footer={
        <>
          <Button onClick={onLater}>Later</Button>
          <Button type="primary" onClick={onSubmit}>
            Download & Install
          </Button>
        </>
      }
    >
      <div>New version available</div>
      <div>Install to enjoy latest features and bug fixes</div>
    </Modal>
  );
};
