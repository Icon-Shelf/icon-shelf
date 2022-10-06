import { keyBy } from 'lodash';
import { GlobalHotKeys } from 'react-hotkeys';
import { useQuery } from '@tanstack/react-query';
import { useCopyActionText } from '../hooks/useActionText';
import { DropdownButton } from '../../../ui/atomic-components/DropdownButton';
import type { CollectionAction } from '/@/data/collections';
import { CollectionsApi } from '/@/data/collections';
import { inlineIconsMap } from '/@/data/collections/iconActions/inlineIconsMap';
import { useOnActionClick } from '/@/data/collections/iconActions/useOnActionClick';
import {
  constructCollectionName,
  getIconActionOfCollection,
  getOrderedCollectionsList,
} from '/@/data/collections/iconActions/utils';
import type { Icon } from '/@/data/icons';
import { platformBasedText } from '/@/utils/platformText';

const keyMap = {
  COLLECTION_FIRST_ACTION: ['cmd+shift+c', 'ctrl+shift+c'],
};

export const ActionsButton = ({ icon }: { icon: Icon }) => {
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
      onCopy(iconActions[0].action.includes('copy') ? 'COPIED!' : 'DONE'),
  };

  if (iconActions[0]) {
    return (
      <>
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges />
        <DropdownButton
          buttonContent={
            intermText === '' && iconActions[0].icon ? (
              <PrimaryActionContent
                icon={inlineIconsMap[iconActions[0].icon]}
                actionName={iconActions[0].name}
              />
            ) : (
              intermText
            )
          }
          onClickPrimaryAction={() =>
            onCopy(iconActions[0].action.includes('copy') ? 'COPIED!' : ' DONE')
          }
        >
          {iconActions
            .filter((action) => !action.hidden)
            .map((action) => {
              const hasSubmenu = action.meta?.hasSubMenu;
              const displayIcon = inlineIconsMap[action.icon];
              return (
                <DropdownButton.MenuItem
                  key={action.id}
                  name={action.name}
                  as={hasSubmenu ? 'div' : 'button'}
                  icon={displayIcon}
                  onClick={() => onActionClick({ actionObj: action, icon })}
                >
                  {hasSubmenu && (
                    <>
                      <div className="ml-auto">{'>'}</div>
                      <ActionSubmenu actionObj={action} icon={icon} onActionClick={onActionClick} />
                    </>
                  )}
                </DropdownButton.MenuItem>
              );
            })}
        </DropdownButton>
      </>
    );
  }
  return null;
};

interface ActionSubmenuProps {
  icon: Icon | null;
  actionObj: CollectionAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onActionClick: (e: any) => Promise<void> | null;
}
const ActionSubmenu = ({ actionObj, onActionClick, icon }: ActionSubmenuProps) => {
  const { data: collections = [] } = useQuery(['collections-list'], () => CollectionsApi.findAll());

  const collectionsMap = keyBy(collections, 'id');
  const orderedCollectionsList = getOrderedCollectionsList(
    collections?.filter((c) => !c.parentCollectionId),
    collectionsMap
  );

  return (
    <DropdownButton.SubMenu position="left">
      {orderedCollectionsList?.map((collection) => (
        <DropdownButton.MenuItem
          as="button"
          key={collection.id}
          name={constructCollectionName(collection, collectionsMap)}
          onClick={() =>
            onActionClick({
              actionObj,
              icon,
              targetCollection: collection,
            })
          }
        ></DropdownButton.MenuItem>
      ))}
    </DropdownButton.SubMenu>
  );
};

const PrimaryActionContent = ({ icon, actionName }: { icon: JSX.Element; actionName: string }) => {
  return (
    <>
      <div className="mr-2">{icon}</div>
      <div>{actionName}</div>
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
  );
};
