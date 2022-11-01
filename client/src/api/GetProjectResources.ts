import axios from "axios";
import { rootUrl } from "../data";
import { ProjectResourcesType, ProjectType } from "../models";

export const apiGetProjectResources = async (
  projectId: string
): Promise<{
  hwset1: string;
  hwset2: string;
}> => {
  const encodedProjectId = encodeURIComponent(projectId);
  const res = await axios.get(
    `${rootUrl}/getProjectResources?projectId=${encodedProjectId}`
  );
  return res.data;
};
