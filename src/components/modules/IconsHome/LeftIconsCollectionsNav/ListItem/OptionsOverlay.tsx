import { FC } from 'react';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-16.svg';
import { CollectionsApi, Collection } from 'data/collections';
import { ipcRenderer } from 'electron';
import { useQueryClient } from 'react-query';
import { ReactComponent as ExternalLinkIcon } from 'assets/icons/external-link-16.svg';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'components/ui/atomic-components';

export const OptionsOverlay: FC<{
  id: string;
  collection?: Collection;
}> = ({ id, collection }) => {
  const queryClent = useQueryClient();
  const history = useHistory();

  const openCollectionFolderInFinder = () => {
    ipcRenderer.send('open-collection-folder', collection?.folderSrc);
  };

  const deleteCollection = () => {
    CollectionsApi.delete(id).then(async () => {
      ipcRenderer.send('remove-collection-folder', collection?.folderSrc);
      await queryClent.invalidateQueries('collections-list');
      history.push('/');
    });
  };

  return (
    <>
      <Dropdown.Item onClick={openCollectionFolderInFinder}>
        <ExternalLinkIcon className="mr-2" />
        <div>Open in finder</div>
      </Dropdown.Item>
      <Dropdown.Item onClick={deleteCollection}>
        <TrashIcon className="mr-2" />
        <div>Delete</div>
      </Dropdown.Item>
    </>
  );
};
