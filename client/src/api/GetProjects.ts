import axios from "axios";
import { rootUrl } from "../data";
import { ProjectType } from "../models";

type ResultProjectType = {
  name: string;
  description: string;
  users: string[];
  _id: {
    $oid: string;
  };
};

export const apiGetProjects = async (
  userId: string
): Promise<"no projects" | ProjectType[]> => {
  const encodedUserId = encodeURIComponent(userId);
  const res = await axios.get(`${rootUrl}/getProjects?userId=${encodedUserId}`);
  if (res.data == "no projects") {
    return "no projects";
  }
  let projects: ProjectType[] = [];
  for (let resultProject of res.data as ResultProjectType[]) {
    const id = resultProject._id.$oid;
    const project: ProjectType = {
      description: resultProject.description,
      id: id,
      name: resultProject.name,
      users: resultProject.users,
    };
    projects.push(project);
  }

  return projects;
};
