import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ContextMenu } from '/@/components/ui/atomic-components';
import type { CollectionAction } from '/@/data/collections';
import { CollectionsApi } from '/@/data/collections';
import type { Icon } from '/@/data/icons';
import { IconsApi } from '/@/data/icons';
import { getIconActionOfCollection } from '/@/data/collections/iconActions/utils';
import { useOnActionClick } from '/@/data/collections/iconActions/useOnActionClick';
import { inlineIconsMap } from '/@/data/collections/iconActions/inlineIconsMap';
import { useContextMenu } from './hooks/useContextMenu';
import { calculateMenuLeft, calculateMenuTop } from './utils';
import { useYOffset } from './hooks/useYOffset';
import { ContextSubMenu } from './ContextSubMenu';

export const IconContextMenu: FC<React.PropsWithChildren<{
  parentDom: HTMLDivElement;
}>> = ({ parentDom }) => {
  const [iconActions, setIconActions] = useState<CollectionAction[]>([]);
  const selectedIconRef = useRef<Icon | null>(null);

  const { anchorPoint, clickedIconId } = useContextMenu();
  const yOffset = useYOffset(parentDom, clickedIconId, anchorPoint);

  const onActionClick = useOnActionClick();

  useEffect(() => {
    (async () => {
      if (clickedIconId) {
        const selectedIcon = await IconsApi.find(clickedIconId);

        if (selectedIcon) {
          selectedIconRef.current = selectedIcon;
          const collection = await CollectionsApi.find(selectedIcon.collectionId);

          setIconActions(getIconActionOfCollection(collection));
        }
      }
    })();
  }, [clickedIconId]);

  if (!clickedIconId) {
    return <></>;
  }

  return (
    <ContextMenu
      style={{
        top:
          calculateMenuTop(
            anchorPoint.y,
            document.body,
            iconActions.filter((action) => !action.hidden).length
          ) - yOffset,
        left: calculateMenuLeft(anchorPoint.x, parentDom),
      }}
    >
      {iconActions
        .filter((action) => !action.hidden)
        .map((actionObj) => (
          <ContextMenu.Item
            onClick={() =>
              !actionObj.meta?.hasSubMenu &&
              onActionClick({ actionObj, icon: selectedIconRef.current })
            }
            key={actionObj.id}
          >
            <div className="mr-2">{inlineIconsMap[actionObj.icon]}</div>
            <div className="w-32 text-left">{actionObj.name}</div>

            {actionObj.meta?.hasSubMenu && (
              <>
                <div className="ml-auto">{'>'}</div>

                <div className="invisible absolute -right-44 top-0 group-hover:visible">
                  <ContextSubMenu
                    icon={selectedIconRef.current}
                    actionObj={actionObj}
                    onActionClick={onActionClick}
                  />
                </div>
              </>
            )}
          </ContextMenu.Item>
        ))}
    </ContextMenu>
  );
};
