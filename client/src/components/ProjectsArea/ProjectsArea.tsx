import { Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { apiCreateProject } from "../../api/CreateProject";
import { rootUrl } from "../../data";

type ProjectsAreaProps = {
  userId: string;
};
export const ProjectsArea = (props: ProjectsAreaProps) => {
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

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
    }
  };

  return (
    <>
      {isCreatingNewProject ? (
        <Box display="flex" flexFlow="column" borderWidth="md">
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
        <Button onClick={() => setIsCreatingNewProject(true)}>
          Create New Project
        </Button>
      )}
    </>
  );
};
