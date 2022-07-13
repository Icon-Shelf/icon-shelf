import type { Preference } from './types';
import { svgoDefaultPreference } from '/@/components/ui/PreferenceModal/svgo-default-preference';

const defaultPreference: Preference = {
  svgo: {
    options: svgoDefaultPreference,
  },
};

export const PreferenceApi = {
  get: (): Preference => {
    let preference = defaultPreference;

    try {
      const preferenceString = window.localStorage.getItem('icon-shelf-preference');
      if (preferenceString) {
        preference = JSON.parse(preferenceString);
      }
    } catch {
      window.localStorage.removeItem('icon-shelf-preference');
      preference = defaultPreference;
    }

    return preference;
  },
  set: async (preference: Preference) => {
    window.localStorage.setItem('icon-shelf-preference', JSON.stringify(preference));
  },
};
