import { ExternalLink } from './externalLink';
import { ReactIcon } from './reactIcon';
import { Trash } from './trash';

export const inlineIconsMap = {
  'react-icon': ReactIcon,
  'external_link-icon': ExternalLink,
  'trash-icon': Trash,
} as const;
