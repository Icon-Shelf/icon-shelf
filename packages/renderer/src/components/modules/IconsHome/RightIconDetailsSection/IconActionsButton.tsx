import { Button } from '/@/components/ui/atomic-components';
import { CollectionsApi } from '/@/data/collections';
import { inlineIconsMap } from '/@/data/collections/iconActions/inlineIconsMap';
import { useOnActionClick } from '/@/data/collections/iconActions/useOnActionClick';
import { getIconActionOfCollection } from '/@/data/collections/iconActions/utils';
import type { Icon } from '/@/data/icons';
import type { FC } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { platformBasedText } from '/@/utils/platformText';
import { useQuery } from 'react-query';
import { useCopyActionText } from '../hooks/useActionText';

const keyMap = {
  COLLECTION_FIRST_ACTION: ['cmd+shift+c', 'ctrl+shift+c'],
};

export const IconActionsButton: FC<
  React.PropsWithChildren<{
    icon: Icon;
  }>
> = ({ icon }) => {
  const { data: collection } = useQuery(['icon-collection', icon.collectionId], () =>
    CollectionsApi.find(icon.collectionId)
  );
  const iconActions = getIconActionOfCollection(collection);

  const onActionClick = useOnActionClick();

  const [intermText, onCopy] = useCopyActionText(() =>
    onActionClick({
      actionObj: iconActions[0],
      icon,
    })
  );

  const handlers = {
    COLLECTION_FIRST_ACTION: () =>
      onCopy(iconActions[0].action.includes('copy') ? 'COPIED!' : ' DONE'),
  };

  if (iconActions[0]) {
    return (
      <div className="w-full">
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges />

        <Button
          type="primary"
          className="w-full"
          onClick={() => onCopy(iconActions[0].action.includes('copy') ? 'COPIED!' : ' DONE')}
        >
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
