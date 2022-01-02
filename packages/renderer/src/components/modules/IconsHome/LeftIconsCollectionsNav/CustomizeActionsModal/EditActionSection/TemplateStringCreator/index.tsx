import type { EditorView, ViewUpdate } from '@codemirror/view';
import { TemplateEditor } from '/@/components/ui/TemplateEditor';
import type { FC } from 'react';
import { useState } from 'react';
import { PlaceholderSelectDropdown } from './PlaceholderSelectDropdown';

interface Props {
  defaultValue: string;
  onChange: (v: string) => void;
}

export const TemplateStringCreator: FC<Props> = ({ defaultValue, onChange }) => {
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
      <label className="flex font-medium text-gray-400 ml-1 mb-1">Copy string template</label>

      {editorView && <PlaceholderSelectDropdown editorView={editorView} />}
      <TemplateEditor
        value={defaultValue}
        onUpdate={onTextChange}
        onEditorInitialize={onEditorInitialize}
      />
    </div>
  );
};
