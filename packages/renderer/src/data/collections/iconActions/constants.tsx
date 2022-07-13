/* eslint-disable quotes */
/* eslint-disable no-template-curly-in-string */
import { platformBasedText } from '/@/utils/platformText';
import type { CollectionAction } from '../types';

export const defaultCollectionActions: CollectionAction[] = [
  {
    name: 'Copy as React',
    id: 'copy-as-react',
    action: 'clipboard-copy-template',
    icon: 'react-icon',
    isPrimary: false,
    hidden: false,
    isEditable: true,
    meta: {
      templateString:
        "import { ReactComponent as <%= _.upperFirst(_.camelCase(iconName)) %>Icon } from '${iconRelativeFilePath}';",
    },
  },
  {
    name: 'Copy as Vue',
    id: 'copy-as-vue',
    action: 'clipboard-copy-template',
    icon: 'vue-icon',
    isPrimary: false,
    hidden: false,
    isEditable: true,
    meta: {
      templateString:
        "import <%= _.capitalize(_.camelCase( iconName )) %> from '${iconRelativeFilePath}';",
    },
  },
  {
    name: 'Copy as SVG',
    id: 'copy-as-svg',
    action: 'clipboard-copy-svg',
    icon: 'copy-clipboard-icon',
    isPrimary: false,
    hidden: false,
    isEditable: false,
    meta: {},
  },
  {
    name: 'SVGO optimize',
    id: 'svgo-optimize',
    action: 'svgo-optimize',
    icon: 'svgo-icon',
    isPrimary: false,
    hidden: false,
    isEditable: false,
    meta: {},
  },
  {
    name: 'Copy as JSX',
    id: 'copy-as-jsx',
    action: 'clipboard-copy-jsx',
    icon: 'copy-clipboard-icon',
    isPrimary: false,
    hidden: false,
    isEditable: false,
    meta: {},
  },
  {
    name: platformBasedText({
      mac: 'Open in finder',
      win: 'Open in explorer',
      linux: 'Open in file manager',
    }),
    id: 'open-in-finder',
    action: 'open-in-finder',
    icon: 'external_link-icon',
    isPrimary: false,
    hidden: false,
    isEditable: false,
    meta: {},
  },
  {
    name: 'Copy to collection',
    id: 'copy-icon-to-collection',
    action: 'copy-icon-to-collection',
    icon: 'copy-icon-to-collection',
    isPrimary: false,
    hidden: false,
    isEditable: false,
    meta: {
      hasSubMenu: true,
    },
  },
  {
    name: 'Move to collection',
    id: 'move-icon-to-collection',
    action: 'move-icon-to-collection',
    icon: 'move-icon-to-collection',
    isPrimary: false,
    hidden: false,
    isEditable: false,
    meta: {
      hasSubMenu: true,
    },
  },
  {
    name: 'Delete',
    id: 'delete-icon',
    action: 'delete-icon',
    icon: 'trash-icon',
    isPrimary: false,
    hidden: false,
    isEditable: false,
    meta: {},
  },
  {
    name: 'Copy as Svelte',
    id: 'copy-as-svelte',
    action: 'clipboard-copy-template',
    icon: 'svelte-icon',
    isPrimary: false,
    hidden: true,
    isEditable: true,
    meta: {
      templateString: "import <%= _.camelCase( iconName ) %> from '${iconRelativeFilePath}';",
    },
  },
  {
    name: 'Copy as Angular',
    id: 'copy-as-angular',
    action: 'clipboard-copy-template',
    icon: 'angular-icon',
    isPrimary: false,
    hidden: true,
    isEditable: true,
    meta: {
      templateString: "<img src='${iconRelativeFilePath}' />",
    },
  },
  {
    name: 'Copy as Ember',
    id: 'copy-as-ember',
    action: 'clipboard-copy-template',
    icon: 'ember-icon',
    isPrimary: false,
    hidden: true,
    isEditable: true,
    meta: {
      templateString: "{{svg-jar '${iconName}'}}",
    },
  },
];
