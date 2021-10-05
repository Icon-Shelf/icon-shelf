import { inlineIconsMap } from './inlineIconsMap';

export interface Collection {
  id?: number;
  name: string;
  folderSrc: string;
  createdAt: number;
  updatedAt: number;
  actions: CollectionAction[];
}

export interface CollectionAction {
  name: string;
  action: string;
  icon: keyof typeof inlineIconsMap;
  isPrimary: boolean;
  hidden: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
}
