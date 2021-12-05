import { inlineIconsMap } from './iconActions/inlineIconsMap';

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
  id: string;
  action: string;
  icon: keyof typeof inlineIconsMap;
  isPrimary: boolean;
  hidden?: boolean;
  isEditable: boolean;
  meta: {
    templateString?: string;
  };
}
