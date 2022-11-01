import axios from "axios";
import { rootUrl } from "../data";

type ApiJoinProjectArgs = {
  userId: string;
  projectId: string;
};

export const apiJoinProject = async (
  args: ApiJoinProjectArgs
): Promise<"user not found" | "success"> => {
  const encodedUserId = encodeURI(args.userId);
  const encodedProjectId = encodeURIComponent(args.projectId);
  const res = await axios.get(
    `${rootUrl}/joinProject?userId=${encodedUserId}&projectId=${encodedProjectId}`
  );
  return res.data;
};
