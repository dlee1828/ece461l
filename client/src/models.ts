export type ProjectResourcesType = {
  hwset1: number;
  hwset2: number;
};

export type ProjectType = {
  name: string;
  description: string;
  users: string[]; // Id, not username
  id: string;
};
