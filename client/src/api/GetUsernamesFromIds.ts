import axios from "axios";
import { rootUrl } from "../data";

export const apiGetUsernamesFromIds = async (
  ids: string[]
): Promise<string[]> => {
  const res = await axios.get(
    `${rootUrl}/getUsernamesFromIds?ids=${encodeURIComponent(
      JSON.stringify(ids)
    )}`
  );
  return res.data;
};
