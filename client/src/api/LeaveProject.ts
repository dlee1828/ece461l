import axios from "axios";
import { rootUrl } from "../data";

type ApiLeaveProjectArgs = {
  userId: string;
  projectId: string;
};

export const apiLeaveProject = async (
  args: ApiLeaveProjectArgs
): Promise<"success"> => {
  const encodedUserId = encodeURI(args.userId);
  const encodedProjectId = encodeURIComponent(args.projectId);
  const res = await axios.get(
    `${rootUrl}/leaveProject?userId=${encodedUserId}&projectId=${encodedProjectId}`
  );
  return res.data;
};
