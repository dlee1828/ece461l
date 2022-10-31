import { Box } from "@chakra-ui/react";
import { ProjectType } from "../../models";
import "./ProjectsArea.css";

export const Project = (props: { project: ProjectType }) => {
  const project = props.project;

  const getUsersString = () => {
    const users = project.users;
    let s = "";
    for (let i = 0; i < users.length; i++) {
      s += users[i];
      if (i < users.length - 1) {
        s += ", ";
      }
    }
    return s;
  };

  return (
    <Box className="projectBox">
      <>{project.name}</>
      <>{project.description}</>
      <>{getUsersString()}</>
    </Box>
  );
};
