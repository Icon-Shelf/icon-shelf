import type { EditorView } from '@codemirror/view';

export type PlaceholderType = 'execution-block' | 'variable' | 'function';

const checkIsCursorInsideExecutionBlock = (editorView: EditorView) => {
  const cursorPos = editorView.state.selection.main.head;

  const textBeforeCursor = editorView.state.sliceDoc(0, cursorPos);

  const tokensInBeforeText = textBeforeCursor.match(/(<%=)|(%>)/g);

  if (tokensInBeforeText?.length && tokensInBeforeText[tokensInBeforeText?.length - 1] === '<%=') {
    return true;
  }

  return false;
};

const generateTextToInsert = (
  editorView: EditorView,
  type: PlaceholderType,
  value: string
): string => {
  const isCursorInsideExecutionBlock = checkIsCursorInsideExecutionBlock(editorView);

  if (type === 'execution-block') {
    return ' <%=    %> ';
  }
  if (type === 'variable') {
    // check if in execution block, if so insert as such else add ${}
    if (isCursorInsideExecutionBlock) {
      return value;
    }
    return `\${${value}}`;
  }
  if (type === 'function') {
    // check if in execution block, if not insert execution block as well
    if (!isCursorInsideExecutionBlock) {
      return `<%= _.${value} %>`;
    }
    return `_.${value}`;
  }

  return '';
};

export const insertPlaceholder = (editorView: EditorView, type: PlaceholderType, value: string) => {
  const cursorPos = editorView.state.selection.main.head;

  const textToInsert = generateTextToInsert(editorView, type, value);

  editorView.dispatch({
    changes: { from: cursorPos, insert: textToInsert },
  });

  if (type !== 'execution-block') {
    editorView.dispatch({
      selection: { anchor: cursorPos + textToInsert.length },
      scrollIntoView: true,
    });
  } else {
    editorView.dispatch({
      selection: { anchor: cursorPos + textToInsert.length - 5 },
      scrollIntoView: true,
    });
  }
  editorView.focus();
};
