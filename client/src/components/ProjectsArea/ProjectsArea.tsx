import {
  Box,
  Button,
  Checkbox,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiCreateProject } from "../../api/CreateProject";
import { apiGetAllUsers } from "../../api/GetAllUsers";
import { apiGetProjects } from "../../api/GetProjects";
import { rootUrl } from "../../data";
import { ProjectType } from "../../models";
import { Project } from "./Project";

type ProjectsAreaProps = {
  userId: string;
};
export const ProjectsArea = (props: ProjectsAreaProps) => {
  type User = { id: string; username: string };
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [indexOfProjectViewingResources, setIndexOfProjectViewingResources] =
    useState<null | number>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const fetchProjects = async () => {
    const result = await apiGetProjects(props.userId);
    // const projectsObj = JSON.parse(projectsString);
    if (result == "no projects") {
      return;
    } else {
      setProjects(result);
    }
  };

  const fetchUsers = async () => {
    const result = await apiGetAllUsers();
    setAllUsers(result);
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const getSelectedUserIds = () => {
    let ids = [];
    for (let i = 0; i < selectedUsers.length; i++) {
      ids.push(selectedUsers[i].id);
    }
    return ids;
  };

  const handleCreate = async () => {
    const idsString = JSON.stringify(getSelectedUserIds());
    const res = await apiCreateProject({ name, description, idsString });
    if (res == "success") {
      toast({
        title: "Create New Project",
        status: "success",
        duration: 5000,
        position: "top-right",
      });
      setIsCreatingNewProject(false);
      setName("");
      setDescription("");
      fetchProjects();
    }
  };

  const handleSetViewingResources = (val: boolean, index: number) => {
    if (val) {
      setIndexOfProjectViewingResources(index);
    } else {
      setIndexOfProjectViewingResources(null);
    }
  };

  const handleCheckedUser = (val: boolean, user: User) => {
    if (val) {
      let selectedUsersCopy: User[] = JSON.parse(JSON.stringify(selectedUsers));
      selectedUsersCopy.push(user);
      setSelectedUsers(selectedUsersCopy);
    } else {
      let selectedUsersCopy: User[] = JSON.parse(JSON.stringify(selectedUsers));
      selectedUsersCopy.splice(selectedUsersCopy.indexOf(user), 1);
      setSelectedUsers(selectedUsersCopy);
    }
  };

  return (
    <>
      {isCreatingNewProject ? (
        <Box
          mt="50px"
          gap="25px"
          display="flex"
          flexFlow="column"
          borderWidth="md"
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project Name"
          ></Input>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
          ></Input>
          <Stack>
            <Text>Select Authorized Users:</Text>
            <Text fontSize={13}>
              (Make sure to select yourself if <br></br> you want access to this
              project.)
            </Text>
            {allUsers.map((user, index) => (
              <Checkbox
                onChange={(e) => handleCheckedUser(e.target.checked, user)}
                key={index}
              >
                {user.username}
              </Checkbox>
            ))}
          </Stack>
          <Button onClick={handleCreate} colorScheme="blue">
            Create
          </Button>
          <Button
            onClick={() => setIsCreatingNewProject(false)}
            colorScheme="red"
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box
          mt="50px"
          display="flex"
          flexDir="column"
          gap="25px"
          alignItems="center"
        >
          <Button onClick={() => setIsCreatingNewProject(true)}>
            Create New Project
          </Button>
          {projects.map((project, index) => (
            <Project
              onRefetch={fetchProjects}
              userId={props.userId}
              project={project}
              key={index}
              viewingResources={indexOfProjectViewingResources == index}
              setViewingResources={(val) =>
                handleSetViewingResources(val, index)
              }
            ></Project>
          ))}
          <Button onClick={() => window.location.reload()}>Log Out</Button>
        </Box>
      )}
    </>
  );
};
