import { Button, Input } from 'components/ui/atomic-components';
import { CollectionAction } from 'data/collections';
import { ChangeEvent, FC } from 'react';
import { TemplateStringCreator } from './TemplateStringCreator';

interface Props {
  action: CollectionAction;
  onBackClick: () => void;
  onActionChange: (action: CollectionAction) => void;
}

export const EditActionSection: FC<Props> = ({ action, onBackClick, onActionChange }) => {
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onActionChange({
      ...action,
      name: value,
    });
  };

  const onTemplateStringChange = (value: string) => {
    const meta = action.meta || {};
    meta.templateString = value;

    onActionChange({
      ...action,
      meta,
    });
  };

  return (
    <div>
      <div>
        <Button className="text-xs" onClick={onBackClick}>
          {'<'} Back
        </Button>
      </div>

      <div className="mx-4">
        <div className="mt-4 w-60">
          <label className="flex font-medium text-gray-400 ml-1 mb-1">Name</label>
          <Input defaultValue={action.name} onChange={onNameChange} />
        </div>

        <TemplateStringCreator
          defaultValue={action.meta.templateString || ''}
          onChange={onTemplateStringChange}
        />
      </div>
    </div>
  );
};
