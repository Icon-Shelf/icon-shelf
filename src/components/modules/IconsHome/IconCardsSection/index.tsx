import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { Icon } from 'data/icons/types';
import { IconCard } from './IconCard';
import { EmptyPlaceholder } from './EmptyPlaceholder';
import { IconContextMenu } from './IconContextMenu';

interface Props {
  icons?: Icon[];
  selectedIcon: Icon | null;
  setSelectedIcon: Dispatch<SetStateAction<Icon | null>>;
  searchQuery?: string | null;
}

export const IconCardsSection: FC<Props> = ({
  icons,
  selectedIcon,
  setSelectedIcon,
  searchQuery,
}) => {
  const wrapperDivRef = useRef<HTMLDivElement>(null);

  if (!icons?.length) {
    return <EmptyPlaceholder searchQuery={searchQuery} />;
  }

  return (
    <div
      className="w-full h-full overflow-y-auto overflow-x-hidden pb-6 relative"
      ref={wrapperDivRef}
    >
      <div
        className="flex-1 w-full p-4 pt-1 grid gap-3 grid-flow-row place-items-center h-auto"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
          gridTemplateRows: 'repeat(auto-fill, 8rem)',
        }}
      >
        {icons?.map((icon) => (
          <IconCard
            key={icon.id}
            icon={icon}
            isSelected={selectedIcon?.id === icon?.id}
            setSelectedIcon={setSelectedIcon}
          />
        ))}
      </div>

      {wrapperDivRef.current && <IconContextMenu parentDom={wrapperDivRef.current} />}
    </div>
  );
};
