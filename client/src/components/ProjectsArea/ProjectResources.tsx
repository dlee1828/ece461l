import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiGetProjectResources } from "../../api/GetProjectResources";
import { apiUpdateResources } from "../../api/UpdateResources";
import { ProjectResourcesType } from "../../models";
import { HardwareSet } from "./HardwareSet";

type ProjectResourcesProps = {
  projectId: string;
  onBack: () => void;
};

export const ProjectResources = (props: ProjectResourcesProps) => {
  const [resources, setResources] = useState<ProjectResourcesType | null>(null);

  const fetchProjectResources = async () => {
    const res = await apiGetProjectResources(props.projectId);
    setResources({
      hwset1: parseInt(res.hwset1),
      hwset2: parseInt(res.hwset2),
    });
  };

  useEffect(() => {
    fetchProjectResources();
  }, []);

  if (!resources) {
    return <></>;
  }

  const handleChangeCount = async (
    newCount: number,
    set: "hwset1" | "hwset2"
  ) => {
    await apiUpdateResources({
      hwset: set,
      newCount,
      projectId: props.projectId,
    });
    await fetchProjectResources();
  };

  return (
    <Box
      borderWidth="1px"
      p="25px"
      borderRadius="25px"
      shadow="md"
      w="1000px"
      gap="20px"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Box display="flex" flexDir="column" gap="25px" alignItems="center">
        <HardwareSet
          projectId={props.projectId}
          name="HWSet1"
          count={resources.hwset1}
          onChangeCount={(newCount) => handleChangeCount(newCount, "hwset1")}
        ></HardwareSet>
        <HardwareSet
          projectId={props.projectId}
          name="HWSet2"
          count={resources.hwset2}
          onChangeCount={(newCount) => handleChangeCount(newCount, "hwset2")}
        ></HardwareSet>
      </Box>
      <Button onClick={props.onBack}>Done</Button>
    </Box>
  );
};
