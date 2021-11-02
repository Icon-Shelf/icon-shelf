import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';
import { keymap, drawSelection, EditorView } from '@codemirror/view';
import { history, historyKeymap } from '@codemirror/history';
import { indentOnInput } from '@codemirror/language';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { defaultKeymap } from '@codemirror/commands';
import { commentKeymap } from '@codemirror/comment';
import './styles.css';
import { evaluationBlockPlugin } from './EvaluationBlock';
import { completionSource } from './autocomplete';

interface EditorProps {
  value?: string;
  onUpdate?: (update: ViewUpdate) => void;
}

export const TemplateEditor = ({
  value = '',
  onUpdate = undefined,
}: EditorProps) => {
  const editor = useRef(null);

  useEffect(() => {
    const currentEditor = editor.current as Exclude<
      typeof editor['current'],
      null
    >;
    const extensions: Extension[] = [
      evaluationBlockPlugin,

      history(),
      drawSelection(),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      autocompletion({
        override: completionSource,
      }),
      oneDark,
      javascript(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...historyKeymap,
        ...commentKeymap,
        ...completionKeymap,
      ]),
    ];
    if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate));

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: currentEditor,
    });

    return () => view.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return <div ref={editor} />;
};
