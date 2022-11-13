import axios from "axios";
import { rootUrl } from "../data";
import { ProjectResourcesType, ProjectType } from "../models";

export const apiGetProjectResources = async (
  projectId: string
): Promise<number> => {
  const encodedProjectId = encodeURIComponent(projectId);
  const res = await axios.get(
    `${rootUrl}/getProjectResources?projectId=${encodedProjectId}`
  );
  return res.data;
};
