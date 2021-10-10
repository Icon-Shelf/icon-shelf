import { Button } from 'components/ui/atomic-components';
import { CollectionAction, CollectionsApi } from 'data/collections';
import { inlineIconsMap } from 'data/collections/iconActions/inlineIconsMap';
import { useOnActionClick } from 'data/collections/iconActions/useOnActionClick';
import { getIconActionOfCollection } from 'data/collections/iconActions/utils';
import { Icon } from 'data/icons';
import { FC, useEffect, useState } from 'react';

export const IconActionsButton: FC<{
  icon: Icon;
}> = ({ icon }) => {
  const [iconActions, setIconActions] = useState<CollectionAction[]>([]);

  const onActionClick = useOnActionClick();

  useEffect(() => {
    (async () => {
      const collection = await CollectionsApi.find(icon.collectionId);

      setIconActions(getIconActionOfCollection(collection));
    })();
  });

  if (iconActions[0]) {
    return (
      <Button
        type="primary"
        className="w-full"
        onClick={() =>
          onActionClick({
            actionObj: iconActions[0],
            icon,
          })
        }
      >
        <div className="mr-2">{inlineIconsMap[iconActions[0].icon]}</div>
        <div>{iconActions[0].name}</div>
      </Button>
    );
  }

  return <></>;
};
