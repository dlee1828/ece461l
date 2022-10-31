export type HWSetType = {
  capacity: number;
  available: number;
};

export type ResourcesType = {
  HWSet1: HWSetType;
  HWSet2: HWSetType;
};

export type ProjectType = {
  name: string;
  description: string;
  users: string[];
};
