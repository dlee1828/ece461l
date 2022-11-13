import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiGetProjectResources } from "../../api/GetProjectResources";
import { apiGetResources } from "../../api/GetResources";
import { apiUpdateResources } from "../../api/UpdateResources";
import { ProjectResourcesType } from "../../models";
import { HardwareSet } from "./HardwareSet";

type ProjectResourcesProps = {
  projectId: string;
  onBack: () => void;
};

export const ProjectResources = (props: ProjectResourcesProps) => {
  const [resources, setResources] = useState<ProjectResourcesType | null>(null);
  const [usage, setUsage] = useState<number | 0>(0);

  const fetchUsage = async () => {
    const res = await apiGetProjectResources(props.projectId);
    setUsage(res);
  };

  const fetchResources = async () => {
    const res = await apiGetResources();
    setResources(res);
  };

  useEffect(() => {
    fetchUsage();
    fetchResources();
  }, []);

  if (!resources) {
    return <></>;
  }

  const handleChangeCount = async (
    change: number,
    set: "hwset1" | "hwset2"
  ) => {
    await apiUpdateResources({
      hwset: set,
      change,
      projectId: props.projectId,
    });
    await fetchUsage();
    await fetchResources();
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
          onChangeCount={(change) => handleChangeCount(change, "hwset1")}
          usage={usage}
        ></HardwareSet>
        <HardwareSet
          projectId={props.projectId}
          name="HWSet2"
          count={resources.hwset2}
          onChangeCount={(change) => handleChangeCount(change, "hwset2")}
          usage={usage}
        ></HardwareSet>
      </Box>
      <Box>Usage: {usage}</Box>
      <Button onClick={props.onBack}>Done</Button>
    </Box>
  );
};
