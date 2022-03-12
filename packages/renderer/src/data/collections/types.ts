import type { inlineIconsMap } from './iconActions/inlineIconsMap';

export interface Collection {
  id?: number;
  name: string;
  folderSrc: string;
  createdAt: number;
  updatedAt: number;
  actions: CollectionAction[];
  childCollectionIds?: number[];
  parentCollectionId?: number;
}

export interface CollectionAction {
  name: string;
  id: string;
  action: string;
  icon: keyof typeof inlineIconsMap;
  isPrimary: boolean;
  hidden?: boolean;
  isEditable: boolean;
  meta: {
    templateString?: string;
    hasSubMenu?: boolean;
  };
}
