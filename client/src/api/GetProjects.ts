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

export const apiGetProjects = async (): Promise<
  "no projects" | ProjectType[]
> => {
  const res = await axios.get(`${rootUrl}/getProjects`);
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
