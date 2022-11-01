import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiGetUsernamesFromIds } from "../../api/GetUsernamesFromIds";
import { apiJoinProject } from "../../api/JoinProject";
import { apiLeaveProject } from "../../api/LeaveProject";
import { ProjectType } from "../../models";
import "./ProjectsArea.css";

export const Project = (props: {
  userId: string;
  project: ProjectType;
  onRefetch: () => Promise<void>;
}) => {
  const project = props.project;
  const [usernames, setUsernames] = useState<string>("");

  useEffect(() => {
    getUsersString();
  }, [JSON.stringify(project)]);

  const getUsersString = async () => {
    const userIds = project.users;
    const users = await apiGetUsernamesFromIds(userIds);

    if (users.length == 0) {
      setUsernames("No users");
      return;
    }
    let s = "";
    for (let i = 0; i < users.length; i++) {
      s += users[i];
      if (i < users.length - 1) {
        s += ", ";
      }
    }

    setUsernames(s);
  };

  const handleClickedJoin = async () => {
    await apiJoinProject({ projectId: project.id, userId: props.userId });
    await props.onRefetch();
    // await getUsersString();
  };

  const handleClickedLeave = async () => {
    await apiLeaveProject({ projectId: project.id, userId: props.userId });
    await props.onRefetch();
  };

  return (
    <Box
      borderWidth="1px"
      p="25px"
      borderRadius="25px"
      shadow="md"
      className="projectBox"
      w="1000px"
      gap="20px"
    >
      <Box w="100px">{project.name}</Box>
      <Box w="300px">{project.description}</Box>
      <Box w="200px">{usernames}</Box>
      {project.users.includes(props.userId) ? (
        <Button w="80px" colorScheme="red" onClick={handleClickedLeave}>
          Leave
        </Button>
      ) : (
        <Button w="80px" colorScheme="blue" onClick={handleClickedJoin}>
          Join
        </Button>
      )}
      <Button>View Resources</Button>
    </Box>
  );
};
