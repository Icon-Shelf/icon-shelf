import type { FC } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Button, Checkbox, Popover } from '/@/components/ui/atomic-components';
import { isDarkMode } from '/@/utils/isDarkMode';

interface Props {
  show?: boolean;
  onSelectColor: (newValue: string | null | undefined) => void;
  color: string | null | undefined;
}

export const ColorPicker: FC<React.PropsWithChildren<Props>> = ({ onSelectColor, color }) => {
  let pickerColor = color;
  if (color === undefined) {
    if (isDarkMode()) {
      pickerColor = '#fff';
    } else {
      pickerColor = '#000';
    }
  }

  return (
    <Popover
      overlay={
        <div className="grid place-items-center">
          <div className="px-6 pt-6 pb-4">
            <HexColorPicker color={pickerColor || 'fff'} onChange={onSelectColor} />
            <HexColorInput
              className="mt-4 block h-10 w-full rounded-lg border-2 border-inputBorder bg-transparent px-4 text-body placeholder-gray-500	outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-primary dark:text-white"
              color={pickerColor || ''}
              onChange={onSelectColor}
              placeholder="hex value"
              disabled={color === null}
            />

            <div className="mt-4 flex w-full justify-center">
              <Checkbox
                onChange={(value) => {
                  onSelectColor(value ? null : undefined);
                }}
                checked={color === null || (!isDarkMode() && color === undefined)}
                label="Use original color"
              />
            </div>
          </div>
        </div>
      }
    >
      <Button>Color</Button>
    </Popover>
  );
};
