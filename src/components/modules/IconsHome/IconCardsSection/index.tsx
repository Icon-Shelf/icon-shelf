import { Dispatch, FC, SetStateAction } from 'react';
import { Icon } from 'data/icons/types';
import { IconCard } from './IconCard';
import { EmptyPlaceholder } from './EmptyPlaceholder';

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
  if (!icons?.length) {
    return <EmptyPlaceholder searchQuery={searchQuery} />;
  }

  return (
    <div
      className="flex-1 w-full overflow-y-auto p-4 grid gap-3 grid-flow-row place-items-center h-full"
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
  );
};
