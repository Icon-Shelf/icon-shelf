export interface Preference {
  svgo: {
    enabled: boolean;
    options: {
      name: string;
      active: boolean;
    }[];
  };
}
