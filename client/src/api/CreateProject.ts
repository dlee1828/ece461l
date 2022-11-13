import axios from "axios";
import { rootUrl } from "../data";

type ApiCreateProjectArgs = {
  name: string;
  description: string;
  idsString: string;
};

export const apiCreateProject = async (
  args: ApiCreateProjectArgs
): Promise<"success"> => {
  const encodedName = encodeURI(args.name);
  const encodedDescription = encodeURIComponent(args.description);
  const encodedIds = encodeURIComponent(args.idsString);
  const res = await axios.get(
    `${rootUrl}/createProject?name=${encodedName}&description=${encodedDescription}&ids=${encodedIds}`
  );
  return res.data;
};
