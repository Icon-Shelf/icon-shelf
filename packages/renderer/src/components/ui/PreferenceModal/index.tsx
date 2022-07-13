import type { FC } from 'react';
import { useState } from 'react';
import { Button, Checkbox, Modal } from '../atomic-components';
import type { SvgoSettingItem } from './svgo-default-preference';
import { svgoDefaultPreference } from './svgo-default-preference';
import { PreferenceApi } from '/@/data/preference';

export const PreferenceModal: FC<React.PropsWithChildren<{
  show: boolean;
  onClose: () => void;
}>> = ({ show, onClose }) => {
  const preference = PreferenceApi.get();

  const [svgItems, setSvgItems] = useState(
    svgoDefaultPreference.map((svgItem) => {
      const fillItem = preference.svgo.options.find((i) => i.name === svgItem.name);

      return {
        ...svgItem,
        ...fillItem,
      };
    })
  );

  const onSvgoSettingsChange = (val: boolean, item: SvgoSettingItem) => {
    setSvgItems((svgItems) => {
      return svgItems.map((settingsItem) => {
        if (settingsItem.name === item.name) {
          return {
            ...settingsItem,
            active: val,
          };
        } else {
          return settingsItem;
        }
      });
    });
  };

  const onSubmit = () => {
    const formattedSvgoOptions = svgItems.map((item) => ({
      name: item.name,
      active: item.active,
      isAux: item.isAux,
      params: item.params,
    }));

    PreferenceApi.set({
      svgo: {
        options: formattedSvgoOptions,
      },
    });
    onClose();
  };

  const onReset = () => {
    setSvgItems(svgoDefaultPreference);
  };

  return (
    <Modal
      show={show}
      title="Preferences"
      onClose={onClose}
      footer={
        <>
          <Button onClick={onReset}>Reset</Button>
          <Button type="primary" onClick={onSubmit}>
            Save
          </Button>
        </>
      }
    >
      <div>
        <label className="block text-lg">SVGO optimize settings</label>
        <div className="mt-4 h-48 overflow-auto">
          {svgItems.map((item) => (
            <div key={item.name} className="mb-4">
              <Checkbox
                label={item.name}
                checked={item.active}
                onChange={(val) => onSvgoSettingsChange(val, item)}
              />
              <label className="mb-2 ml-8 block text-sm text-gray-500 dark:text-body">
                {item.desc}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
