import axios from "axios";
import { rootUrl } from "../data";

export const apiGetAllUsers = async (): Promise<
  { id: string; username: string }[]
> => {
  const res = await axios.get(`${rootUrl}/getAllUsers`);
  return res.data;
};
