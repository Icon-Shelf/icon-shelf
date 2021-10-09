import { Button, Input } from 'components/ui/atomic-components';
import { CollectionAction } from 'data/collections';
import { FC } from 'react';
import { TemplateStringCreator } from './TemplateStringCreator';

interface Props {
  action: CollectionAction;
  onBackClick: () => void;
}

export const EditActionSection: FC<Props> = ({ action, onBackClick }) => {
  return (
    <div>
      <div>
        <Button className="text-xs" onClick={onBackClick}>
          {'<'} Back
        </Button>
      </div>

      <div className="mx-4">
        <div className="mt-4 w-60">
          <label className="flex font-medium text-gray-400 ml-1 mb-1">
            Name
          </label>
          <Input defaultValue={action.name} />
        </div>

        <TemplateStringCreator value={action.meta.templateString || ''} />
      </div>
    </div>
  );
};
