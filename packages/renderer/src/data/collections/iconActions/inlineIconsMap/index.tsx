import { ExternalLink } from "./externalLink";
import { ReactIcon } from "./reactIcon";
import { Trash } from "./trash";
import { EmberIcon } from "./EmberIcon";
import { VueIcon } from "./VueIcon";
import { SvelteIcon } from "./SvelteIcon";
import { AngularIcon } from "./AngularIcon";
import { CopyClipboardIcon } from "./CopyClipboardIcon";

export const inlineIconsMap = {
  "react-icon": ReactIcon,
  "ember-icon": EmberIcon,
  "vue-icon": VueIcon,
  "external_link-icon": ExternalLink,
  "trash-icon": Trash,
  "svelte-icon": SvelteIcon,
  "angular-icon": AngularIcon,
  "copy-clipboard-icon": CopyClipboardIcon,
} as const;
