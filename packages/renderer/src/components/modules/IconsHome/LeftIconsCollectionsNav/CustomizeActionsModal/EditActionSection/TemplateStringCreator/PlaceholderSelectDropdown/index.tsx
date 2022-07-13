import type { FC } from 'react';
import { ReactComponent as CheveronDownIcon } from '/assets/icons/cheveron-down.svg';
import { ReactComponent as CheveronRightIcon } from '/assets/icons/cheveron-right.svg';
import { editorFunctionOptions } from '/@/components/ui/TemplateEditor/autocomplete';
import type { EditorView } from '@codemirror/view';
import type { PlaceholderType } from './utils';
import { insertPlaceholder } from './utils';
import { MultilevelDropdown } from '../../../../../../../ui/atomic-components/MultilevelDropdown';

export const PlaceholderSelectDropdown: FC<React.PropsWithChildren<{
  editorView: EditorView;
}>> = ({ editorView }) => {
  const handleClick = (type: PlaceholderType, value: string) => {
    insertPlaceholder(editorView, type, value);
  };

  return (
    <MultilevelDropdown
      title={
        <>
          Insert
          <CheveronDownIcon />
        </>
      }
      buttonClassName="btn btn-default"
      position="right"
    >
      <MultilevelDropdown.Item>
        <div className="w-full">Variable</div>
        <CheveronRightIcon className="float-right" />

        <MultilevelDropdown.Submenu position="right">
          <MultilevelDropdown.Item onMouseDown={() => handleClick('variable', 'iconName')}>
            Icon name
          </MultilevelDropdown.Item>
          <MultilevelDropdown.Item
            onMouseDown={() => handleClick('variable', 'iconRelativeFilePath')}
          >
            Icon relative file path
          </MultilevelDropdown.Item>
          <MultilevelDropdown.Item
            onMouseDown={() => handleClick('variable', 'iconAbsoluteFilePath')}
          >
            Icon absolute file path
          </MultilevelDropdown.Item>
          <MultilevelDropdown.Item onMouseDown={() => handleClick('variable', 'iconFileType')}>
            Icon file type
          </MultilevelDropdown.Item>
        </MultilevelDropdown.Submenu>
      </MultilevelDropdown.Item>

      <MultilevelDropdown.Item>
        <div className="w-full">Function</div>
        <CheveronRightIcon className="float-right" />

        <MultilevelDropdown.Submenu position="right">
          {editorFunctionOptions.map((fnItem) => (
            <MultilevelDropdown.Item
              key={fnItem.label}
              onMouseDown={() => handleClick('function', fnItem.apply)}
            >
              _.{fnItem.label}
            </MultilevelDropdown.Item>
          ))}
        </MultilevelDropdown.Submenu>
      </MultilevelDropdown.Item>

      <MultilevelDropdown.Item onMouseDown={() => handleClick('execution-block', '')}>
        Execution block
      </MultilevelDropdown.Item>
    </MultilevelDropdown>
  );
};
