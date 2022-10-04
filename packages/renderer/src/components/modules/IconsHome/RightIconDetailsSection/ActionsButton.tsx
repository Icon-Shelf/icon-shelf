import { keyBy } from 'lodash';
import { GlobalHotKeys } from 'react-hotkeys';
import { useQuery } from 'react-query';
import { useCopyActionText } from '../hooks/useActionText';
import { DropdownButton } from '../../../ui/atomic-components/DropdownButton';
import type { CollectionAction } from '/@/data/collections';
import { CollectionsApi } from '/@/data/collections';
import { inlineIconsMap } from '/@/data/collections/iconActions/inlineIconsMap';
import { useOnActionClick } from '/@/data/collections/iconActions/useOnActionClick';
import {
  constructCollectionName,
  getOrderedCollectionsList,
} from '/@/data/collections/iconActions/utils';
import type { Icon } from '/@/data/icons';
import { platformBasedText } from '/@/utils/platformText';

const keyMap = {
  COLLECTION_FIRST_ACTION: ['cmd+shift+c', 'ctrl+shift+c'],
};

export const ActionsButton = ({ icon, actions }: { icon: Icon; actions: CollectionAction[] }) => {
  const { data: collections = [] } = useQuery('collections-list', () => CollectionsApi.findAll());

  const collectionsMap = keyBy(collections, 'id');
  const orderedCollectionsList = getOrderedCollectionsList(
    collections?.filter((c) => !c.parentCollectionId),
    collectionsMap
  );

  const onActionClick = useOnActionClick();

  const [intermText, onCopy] = useCopyActionText(() =>
    onActionClick({
      actionObj: actions[0],
      icon,
    })
  );

  const handlers = {
    COLLECTION_FIRST_ACTION: () => onCopy(actions[0].action.includes('copy') ? 'COPIED!' : 'DONE'),
  };

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges />
      <DropdownButton
        buttonContent={
          intermText === '' ? (
            <PrimaryActionContent
              icon={inlineIconsMap[actions[0].icon]}
              actionName={actions[0].name}
            />
          ) : (
            intermText
          )
        }
        onClickPrimaryAction={() =>
          onCopy(actions[0].action.includes('copy') ? 'COPIED!' : ' DONE')
        }
      >
        {actions.map((action) => {
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
                  <DropdownButton.SubMenu position="left">
                    {orderedCollectionsList?.map((collection) => (
                      <DropdownButton.MenuItem
                        as="button"
                        key={collection.id}
                        name={constructCollectionName(collection, collectionsMap)}
                        onClick={() =>
                          onActionClick({ actionObj: action, icon, targetCollection: collection })
                        }
                      ></DropdownButton.MenuItem>
                    ))}
                  </DropdownButton.SubMenu>
                </>
              )}
            </DropdownButton.MenuItem>
          );
        })}
      </DropdownButton>
    </>
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
