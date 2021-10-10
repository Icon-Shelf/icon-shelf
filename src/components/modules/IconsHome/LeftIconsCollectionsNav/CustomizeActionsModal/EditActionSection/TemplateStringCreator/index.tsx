import { TextArea } from 'components/ui/atomic-components';
import { ChangeEvent, FC } from 'react';

interface Props {
  defaultValue: string;
  onChange: (v: string) => void;
}

export const TemplateStringCreator: FC<Props> = ({
  defaultValue,
  onChange,
}) => {
  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    onChange(value);
  };

  return (
    <div className="mt-8">
      <label className="flex font-medium text-gray-400 ml-1 mb-1">
        Copy string template
      </label>
      <TextArea defaultValue={defaultValue} onChange={onTextChange} />
    </div>
  );
};
