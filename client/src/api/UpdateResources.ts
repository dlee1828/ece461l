import axios from "axios";
import { rootUrl } from "../data";

type ApiUpdateResourcesArgs = {
  projectId: string;
  hwset: "hwset1" | "hwset2";
  newCount: number;
};

export const apiUpdateResources = async (
  args: ApiUpdateResourcesArgs
): Promise<"success"> => {
  const encodedProjectId = encodeURIComponent(args.projectId);
  const encodedHwset = encodeURIComponent(args.hwset);
  const encodedNewCount = encodeURIComponent(args.newCount);
  const res = await axios.get(
    `${rootUrl}/updateResources?projectId=${encodedProjectId}&hwset=${encodedHwset}&newCount=${encodedNewCount}`
  );
  return res.data;
};
