import { FC } from 'react';
import { IconCard } from './IconCard';

export const IconCardsSection: FC = () => {
  return (
    <div
      className="flex-1 w-full overflow-y-auto p-4 grid gap-3 grid-flow-row place-items-center h-full"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
        gridTemplateRows: 'repeat(auto-fill, 8rem)',
      }}
    >
      <IconCard />
      <IconCard />
      <IconCard />
    </div>
  );
};
