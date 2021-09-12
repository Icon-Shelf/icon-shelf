import { FC } from 'react';
import { Button } from 'components/ui/atomic-components';
import { ReactComponent as CopyIcon } from 'assets/icons/clipboard-copy.svg';
import { Icon } from 'data/icons';
import SVG from 'react-inlinesvg';
import { camelCase } from 'lodash';
import { formatBytes } from 'utils/formatBytes';

interface Props {
  selectedIcon: Icon | null;
}

export const RightIconDetailsSection: FC<Props> = ({ selectedIcon }) => {
  const onCopyClick = () => {
    if (selectedIcon) {
      const copyText = `import { ReactComponent as ${camelCase(
        selectedIcon.name
      )}Icon } from '${selectedIcon.imageSrc}';`;

      navigator.clipboard.writeText(copyText);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-black2 w-96 p-4 pt-5 min-w-max flex-shrink-0">
      <div>
        <div className="w-full bg-black h-40 rounded-md flex items-center justify-center">
          {selectedIcon?.imageSrc && (
            <SVG src={selectedIcon.imageSrc} className="h-14 w-14 text-white" />
          )}
        </div>

        <div className="flex flex-col mt-3">
          <span className="text-white">{selectedIcon?.name}</span>
          <span className="mt-1 text-sm">
            {formatBytes(selectedIcon?.byteSize)}
          </span>
        </div>

        <div className="mt-8">
          <span className="text-white text-lg">Details</span>

          <div className="flex justify-between">
            <span className="mt-1">Format</span>
            <span className="mt-1 text-white">SVG</span>
          </div>

          <div className="flex justify-between mt-1">
            <span className="mt-1">Dimensions</span>
            <span className="mt-1 text-white">16x16</span>
          </div>

          <div className="flex justify-between mt-1">
            <span className="mt-1">Updated</span>
            <span className="mt-1 text-white">July 11 2021</span>
          </div>
        </div>
      </div>

      <div>
        <Button
          type="primary"
          icon={<CopyIcon />}
          className="w-full"
          onClick={onCopyClick}
        >
          Copy Icon
        </Button>
      </div>
    </div>
  );
};
