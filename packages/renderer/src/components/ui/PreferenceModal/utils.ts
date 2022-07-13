import { keyBy } from 'lodash';
import { PreferenceApi } from '/@/data/preference';

export const getSvgoPreference = () => {
  const preference = PreferenceApi.get();
  const optionsMap = keyBy(
    preference.svgo.options.filter((item) => !item.isAux),
    'name'
  );

  preference.svgo.options
    .filter((item) => !!item.isAux)
    .forEach((item) => {
      if (item.active && item.isAux) {
        const original = optionsMap[item.isAux];

        original['params'] = item.params;
        original.active = true;
      }
    });

  const options = Object.values(optionsMap);

  return {
    options: options,
  };
};
