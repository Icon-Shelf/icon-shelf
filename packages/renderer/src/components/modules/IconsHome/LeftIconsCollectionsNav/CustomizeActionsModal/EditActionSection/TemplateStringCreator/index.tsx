import type { EditorView, ViewUpdate } from '@codemirror/view';
import { TemplateEditor } from '/@/components/ui/TemplateEditor';
import type { FC } from 'react';
import { useState } from 'react';
import { PlaceholderSelectDropdown } from './PlaceholderSelectDropdown';

interface Props {
  defaultValue: string;
  onChange: (v: string) => void;
}

export const TemplateStringCreator: FC<React.PropsWithChildren<Props>> = ({
  defaultValue,
  onChange,
}) => {
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  const onTextChange = (v: ViewUpdate) => {
    if (v.docChanged) {
      const value = v.state.doc.toString();
      onChange(value);
    }
  };

  const onEditorInitialize = (view: EditorView) => {
    setEditorView(view);
  };

  return (
    <div className="mt-8">
      <label className="ml-1 mb-2 flex font-medium text-black dark:text-gray-400">
        Customize how icon as code string is generated
      </label>

      {editorView && <PlaceholderSelectDropdown editorView={editorView} />}
      <TemplateEditor
        value={defaultValue}
        onUpdate={onTextChange}
        onEditorInitialize={onEditorInitialize}
      />
    </div>
  );
};
