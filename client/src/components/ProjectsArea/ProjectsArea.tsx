import { Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiCreateProject } from "../../api/CreateProject";
import { apiGetProjects } from "../../api/GetProjects";
import { rootUrl } from "../../data";
import { ProjectType } from "../../models";
import { Project } from "./Project";

type ProjectsAreaProps = {
  userId: string;
};
export const ProjectsArea = (props: ProjectsAreaProps) => {
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const fetchProjects = async () => {
    const result = await apiGetProjects();
    // const projectsObj = JSON.parse(projectsString);
    if (result == "no projects") {
      return;
    } else {
      setProjects(result);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    const res = await apiCreateProject({ name, description });
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
            ></Project>
          ))}
          <Button onClick={() => window.location.reload()}>Log Out</Button>
        </Box>
      )}
    </>
  );
};
