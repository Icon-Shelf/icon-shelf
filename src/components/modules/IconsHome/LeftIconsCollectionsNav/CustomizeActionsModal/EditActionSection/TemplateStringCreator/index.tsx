import { ViewUpdate } from '@codemirror/view';
import { TemplateEditor } from 'components/ui/TemplateEditor';
import { FC } from 'react';

interface Props {
  defaultValue: string;
  onChange: (v: string) => void;
}

export const TemplateStringCreator: FC<Props> = ({
  defaultValue,
  onChange,
}) => {
  const onTextChange = (v: ViewUpdate) => {
    if (v.docChanged) {
      const value = v.state.doc.toString();
      onChange(value);
    }
  };

  return (
    <div className="mt-8">
      <label className="flex font-medium text-gray-400 ml-1 mb-1">
        Copy string template
      </label>
      <TemplateEditor value={defaultValue} onUpdate={onTextChange} />
    </div>
  );
};
