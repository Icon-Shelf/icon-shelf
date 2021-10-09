import { TextArea } from 'components/ui/atomic-components';
import { FC } from 'react';

interface Props {
  value: string;
}

export const TemplateStringCreator: FC<Props> = ({ value }) => {
  return (
    <div className="mt-8">
      <label className="flex font-medium text-gray-400 ml-1 mb-1">
        Template copy string:
      </label>
      <TextArea defaultValue={value} />
    </div>
  );
};
