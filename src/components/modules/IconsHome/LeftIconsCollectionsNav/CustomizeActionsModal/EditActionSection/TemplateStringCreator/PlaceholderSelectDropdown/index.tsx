import { FC } from 'react';
import { ReactComponent as CheveronDownIcon } from 'assets/icons/cheveron-down.svg';
import { ReactComponent as CheveronRightIcon } from 'assets/icons/cheveron-right.svg';
import MultiDropdown, { Dropdown as DropdownType } from 'react-multilevel-dropdown';
import { editorFunctionOptions } from 'components/ui/TemplateEditor/autocomplete';
import { EditorView } from '@codemirror/view';
import './styles.css';
import { insertPlaceholder, PlaceholderType } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Dropdown = MultiDropdown as any as typeof DropdownType;

export const PlaceholderSelectDropdown: FC<{
  editorView: EditorView;
}> = ({ editorView }) => {
  const handleClick = (type: PlaceholderType, value: string) => {
    const trigger = document.querySelector(
      '.template-editor-placeholder-dropdown--button'
    ) as HTMLElement;

    trigger?.click();

    insertPlaceholder(editorView, type, value);
  };

  return (
    <Dropdown
      title={
        <>
          Insert
          <CheveronDownIcon />
        </>
      }
      buttonClassName="template-editor-placeholder-dropdown--button btn-default"
      wrapperClassName="template-editor-placeholder-dropdown--dropdown"
      menuClassName="template-editor-placeholder-dropdown--menu"
      position="right"
    >
      <Dropdown.Item>
        <div className="w-full">Variable</div>
        <CheveronRightIcon className="float-right" />

        <Dropdown.Submenu position="right">
          <Dropdown.Item onClick={() => handleClick('variable', 'iconName')}>
            Icon name
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleClick('variable', 'iconRelativeFilePath')}>
            Icon relative file path
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleClick('variable', 'iconAbsoluteFilePath')}>
            Icon absolute file path
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleClick('variable', 'iconFileType')}>
            Icon file type
          </Dropdown.Item>
        </Dropdown.Submenu>
      </Dropdown.Item>

      <Dropdown.Item>
        <div className="w-full">Function</div>
        <CheveronRightIcon className="float-right" />

        <Dropdown.Submenu position="right" className="template-editor-function-dropdown-menu">
          {editorFunctionOptions.map((fnItem) => (
            <Dropdown.Item key={fnItem.label} onClick={() => handleClick('function', fnItem.apply)}>
              _.{fnItem.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Submenu>
      </Dropdown.Item>

      <Dropdown.Item onClick={() => handleClick('execution-block', '')}>
        Execution block
      </Dropdown.Item>
    </Dropdown>
  );
};
