import axios from "axios";
import { rootUrl } from "../data";
import { ProjectResourcesType, ProjectType } from "../models";

export const apiGetResources = async (): Promise<{
  hwset1: number;
  hwset2: number;
}> => {
  const res = await axios.get(`${rootUrl}/getResources`);
  return res.data;
};
