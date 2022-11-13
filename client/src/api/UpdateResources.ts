import axios from "axios";
import { rootUrl } from "../data";

type ApiUpdateResourcesArgs = {
  projectId: string;
  hwset: "hwset1" | "hwset2";
  change: number;
};

export const apiUpdateResources = async (
  args: ApiUpdateResourcesArgs
): Promise<"success"> => {
  const encodedProjectId = encodeURIComponent(args.projectId);
  const encodedHwset = encodeURIComponent(args.hwset);
  const encodedChange = encodeURIComponent(args.change);
  const res = await axios.get(
    `${rootUrl}/updateResources?projectId=${encodedProjectId}&hwset=${encodedHwset}&change=${encodedChange}`
  );
  return res.data;
};
