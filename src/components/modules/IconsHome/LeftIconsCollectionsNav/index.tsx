import { FC } from 'react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as ViewGridIcon } from 'assets/icons/view-grid.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';

import { Button } from 'components/ui/atomic-components';
import { ListItem } from './ListItem';

export const LeftIconsCollectionsNav: FC = () => {
  return (
    <div className="bg-black2 w-64 min-w-max flex-shrink-0">
      <div className="flex justify-end mt-5 mx-4">
        <Button icon={<PlusIcon />} type="text" />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <ListItem name="All icons" icon={<ViewGridIcon />} />
        <ListItem name="All icons" icon={<HeartIcon />} />
      </div>

      <div className="mt-4">
        <div className="ml-4 text-base">Collections</div>
        <div className="flex flex-col gap-2 mt-2">
          <ListItem name="Material icons" />
          <ListItem name="Hero icons" />
        </div>
      </div>
    </div>
  );
};
