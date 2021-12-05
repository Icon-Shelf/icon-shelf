/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
import {
  WidgetType,
  EditorView,
  Decoration,
  ViewUpdate,
  ViewPlugin,
  DecorationSet,
  Range,
} from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';

// Widget
class EvaluationWidget extends WidgetType {
  constructor(readonly matchedText: string) {
    super();
  }

  toDOM() {
    const wrap = document.createElement('span');

    wrap.className = 'cm-evaluation-block cm-custom-tooltip';
    wrap.textContent = this.matchedText;

    const tooltip = wrap.appendChild(document.createElement('span'));
    tooltip.className = 'cm-tooltip-text';

    if (this.matchedText === '<%=') {
      tooltip.textContent = 'Execution block start';
    } else {
      tooltip.textContent = 'Execution block end';
    }

    return wrap;
  }
}

// evaluation block

function evaluationBlock(view: EditorView) {
  const widgets: Range<Decoration>[] = [];
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (type, from, to) => {
        let matchedText;
        let matchedFrom = 0;
        let matchedTo = 0;

        if (type.name === 'Equals') {
          matchedFrom = to - 3;
          matchedTo = to + 1;
          matchedText = view.state.doc.sliceString(to - 3, to);
        } else if (view.state.doc.sliceString(from, to) === '%>') {
          matchedFrom = from - 1;
          matchedTo = to;
          matchedText = view.state.doc.sliceString(from, to);
        } else if (view.state.doc.sliceString(from, to) === '>') {
          matchedFrom = from - 1;
          matchedTo = to;
          matchedText = view.state.doc.sliceString(from - 1, to);
        }

        if (matchedText && ['<%=', '%>'].includes(matchedText)) {
          const deco = Decoration.replace({
            widget: new EvaluationWidget(matchedText),
            inclusive: true,
          });
          widgets.push(deco.range(matchedFrom, matchedTo));
        }
      },
    });
  }
  return Decoration.set(widgets);
}

//! EvaluationBlockPlugin

export const evaluationBlockPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = evaluationBlock(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged)
        this.decorations = evaluationBlock(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);
