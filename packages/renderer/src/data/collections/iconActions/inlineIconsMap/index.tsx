import { ExternalLink } from './externalLink';
import { ReactIcon } from './reactIcon';
import { Trash } from './trash';
import { EmberIcon } from './EmberIcon';
import { VueIcon } from './VueIcon';
import { SvelteIcon } from './SvelteIcon';
import { AngularIcon } from './AngularIcon';
import { CopyClipboardIcon } from './CopyClipboardIcon';
import { MoveToCollection } from './MoveToCollection';
import { CopyToCollection } from './CopyToCollection';
import { svgoIcon } from './svgoIcon';

export const inlineIconsMap = {
  'react-icon': ReactIcon,
  'ember-icon': EmberIcon,
  'vue-icon': VueIcon,
  'external_link-icon': ExternalLink,
  'trash-icon': Trash,
  'svelte-icon': SvelteIcon,
  'angular-icon': AngularIcon,
  'copy-clipboard-icon': CopyClipboardIcon,
  'copy-icon-to-collection': CopyToCollection,
  'move-icon-to-collection': MoveToCollection,
  'svgo-icon': svgoIcon,
} as const;
