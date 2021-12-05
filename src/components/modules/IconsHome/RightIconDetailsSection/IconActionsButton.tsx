import { Button } from 'components/ui/atomic-components';
import { CollectionAction, CollectionsApi } from 'data/collections';
import { inlineIconsMap } from 'data/collections/iconActions/inlineIconsMap';
import { useOnActionClick } from 'data/collections/iconActions/useOnActionClick';
import { getIconActionOfCollection } from 'data/collections/iconActions/utils';
import { Icon } from 'data/icons';
import { FC, useEffect, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { platformBasedText } from 'utils/platformText';

const keyMap = {
  COLLECTION_FIRST_ACTION: ['cmd+shift+c', 'ctrl+shift+c'],
};

export const IconActionsButton: FC<{
  icon: Icon;
}> = ({ icon }) => {
  const [iconActions, setIconActions] = useState<CollectionAction[]>([]);
  const [intermText, setIntermText] = useState('');

  const onActionClick = useOnActionClick();

  const onActionBtnClick = () => {
    onActionClick({
      actionObj: iconActions[0],
      icon,
    });

    let text = 'DONE!';
    if (iconActions[0].action.includes('copy')) {
      text = 'COPIED!';
    }
    setIntermText(text);
    setTimeout(() => {
      setIntermText('');
    }, 1500);
  };

  const handlers = {
    COLLECTION_FIRST_ACTION: () => onActionBtnClick(),
  };

  useEffect(() => {
    (async () => {
      const collection = await CollectionsApi.find(icon.collectionId);

      setIconActions(getIconActionOfCollection(collection));
    })();
  }, [icon.collectionId]);

  if (iconActions[0]) {
    return (
      <div>
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges />

        <Button type="primary" className="w-full" onClick={onActionBtnClick}>
          {intermText && intermText}
          {!intermText && (
            <>
              <div className="mr-2">{inlineIconsMap[iconActions[0].icon]}</div>
              <div>{iconActions[0].name}</div>
              &nbsp;
              <span className="text-xs">
                (
                {platformBasedText({
                  mac: '⌘⇧C',
                  win: 'Ctrl+Shift+c',
                  linux: 'Ctrl+Shift+c',
                })}
                )
              </span>
            </>
          )}
        </Button>
      </div>
    );
  }

  return <></>;
};
