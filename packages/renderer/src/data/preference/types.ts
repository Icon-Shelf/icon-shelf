export interface Preference {
  svgo: {
    options: {
      name: string;
      active: boolean;
      isAux?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params?: any;
    }[];
  };
}
