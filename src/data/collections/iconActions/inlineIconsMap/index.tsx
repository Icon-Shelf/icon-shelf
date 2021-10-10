import { ExternalLink } from './externalLink';
import { ReactIcon } from './reactIcon';
import { Trash } from './trash';
import { EmberIcon } from './EmberIcon';
import { VueIcon } from './VueIcon';

export const inlineIconsMap = {
  'react-icon': ReactIcon,
  'ember-icon': EmberIcon,
  'vue-icon': VueIcon,
  'external_link-icon': ExternalLink,
  'trash-icon': Trash,
} as const;
