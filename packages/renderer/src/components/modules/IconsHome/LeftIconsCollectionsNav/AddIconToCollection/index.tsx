import type { DragEvent, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '/@/components/ui/atomic-components';
import { ReactComponent as PlusIcon } from '/assets/icons/plus.svg';
import { useQuery } from 'react-query';
import { CollectionsApi } from '/@/data/collections';
import Tooltip from 'rc-tooltip';
import { AddIconToCollectionModal } from './modal';

export const AddIconToCollection: FC<React.PropsWithChildren<unknown>> = () => {
  const { data: collectionsList } = useQuery('collections-list', () => CollectionsApi.findAll());

  const [showIconAddModal, setShowIconAddModal] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleDragStart = useCallback((event: Event) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = event as any as DragEvent;

    //effectAllowed copy: hack to distinguish drag of icons from inside of icon shelf
    if (
      e.dataTransfer.effectAllowed !== 'copy' &&
      [...e.dataTransfer.items].find((item) => item.kind === 'file')
    ) {
      setShowIconAddModal(true);
      event.preventDefault();
    }
  }, []);

  const onAddIconClick = () => {
    setShowIconAddModal(true);
  };

  useEffect(() => {
    const dom = document.querySelector('#app');
    dom?.addEventListener('dragover', handleDragStart);

    return () => {
      dom?.removeEventListener('dragover', handleDragStart);
    };
  }, [handleDragStart]);

  return (
    <>
      <Tooltip
        visible={tooltipVisible}
        overlay="You need to create a collection before adding icons"
        placement="bottom"
        onVisibleChange={(v) => {
          if (v) {
            if (!collectionsList?.length) {
              setTooltipVisible(v);
            }
          } else {
            setTooltipVisible(v);
          }
        }}
      >
        <div>
          <Button
            className="ml-4"
            id="add-icon-to-collection-btn"
            icon={<PlusIcon />}
            onClick={onAddIconClick}
            disabled={!collectionsList?.length}
          >
            Add icon
          </Button>
        </div>
      </Tooltip>

      <AddIconToCollectionModal
        show={showIconAddModal}
        onClose={() => setShowIconAddModal(false)}
      />
    </>
  );
};
