/* eslint-disable no-template-curly-in-string */
import { CollectionAction } from '../types';

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
    name: 'Copy as Ember',
    id: 'copy-as-ember',
    action: 'clipboard-copy-template',
    icon: 'ember-icon',
    isPrimary: false,
    hidden: false,
    isEditable: true,
    meta: {
      templateString: "{{svg-jar '${iconName}'}}",
    },
  },
  {
    name: 'Open in finder',
    id: 'open-in-finder',
    action: 'open-in-finder',
    icon: 'external_link-icon',
    isPrimary: false,
    hidden: false,
    isEditable: false,
    meta: {},
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
];
