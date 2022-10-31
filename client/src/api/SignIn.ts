import axios from "axios";
import { rootUrl } from "../data";

type ApiSignInArgs = {
  username: string;
  password: string;
};

export const apiSignIn = async (args: ApiSignInArgs) => {
  const encodedPassword = encodeURI(args.password);
  const encodedUsername = encodeURIComponent(args.username);
  const res = await axios.get(
    `${rootUrl}/signIn?username=${encodedUsername}&password=${encodedPassword}`
  );
  return res.data;
};
