import axios from "axios";
import { rootUrl } from "../data";

type ApiCreateProjectArgs = {
  name: string;
  description: string;
};

export const apiCreateProject = async (
  args: ApiCreateProjectArgs
): Promise<"success"> => {
  const encodedName = encodeURI(args.name);
  const encodedDescription = encodeURIComponent(args.description);
  const res = await axios.get(
    `${rootUrl}/createProject?name=${encodedName}&description=${encodedDescription}`
  );
  return res.data;
};
