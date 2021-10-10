import { FC, useEffect, useRef, useState } from 'react';
import { ContextMenu } from 'components/ui/atomic-components';
import { CollectionAction, CollectionsApi } from 'data/collections';
import { Icon, IconsApi } from 'data/icons';
import { getIconActionOfCollection } from 'data/collections/iconActions/utils';
import { useOnActionClick } from 'data/collections/iconActions/useOnActionClick';
import { inlineIconsMap } from 'data/collections/iconActions/inlineIconsMap';
import { useContextMenu } from './hooks/useContextMenu';

export const IconContextMenu: FC<{
  parentDom: HTMLDivElement;
}> = ({ parentDom }) => {
  const [iconActions, setIconActions] = useState<CollectionAction[]>([]);
  const selectedIconRef = useRef<Icon | null>(null);

  const { anchorPoint, clickedIconId } = useContextMenu();

  const onActionClick = useOnActionClick();

  useEffect(() => {
    (async () => {
      if (clickedIconId) {
        const selectedIcon = await IconsApi.find(clickedIconId);

        if (selectedIcon) {
          selectedIconRef.current = selectedIcon;
          const collection = await CollectionsApi.find(
            selectedIcon.collectionId
          );

          setIconActions(getIconActionOfCollection(collection));
        }
      }
    })();
  });

  if (!clickedIconId) {
    return <></>;
  }

  return (
    <ContextMenu
      style={{
        top: anchorPoint.y + parentDom.scrollTop - parentDom.clientTop - 60,
        left: anchorPoint.x + parentDom.scrollLeft - parentDom.clientLeft - 260,
      }}
    >
      {iconActions
        .filter((action) => !action.hidden)
        .map((actionObj) => (
          <ContextMenu.Item
            onClick={() =>
              onActionClick({ actionObj, icon: selectedIconRef.current })
            }
            key={actionObj.id}
          >
            <div className="mr-2">{inlineIconsMap[actionObj.icon]}</div>
            <div>{actionObj.name}</div>
          </ContextMenu.Item>
        ))}
    </ContextMenu>
  );
};
