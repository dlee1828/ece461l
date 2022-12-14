import axios from "axios";
import { rootUrl } from "../data";

type ApiSignUpArgs = {
  username: string;
  password: string;
};

export const apiSignUp = async (
  args: ApiSignUpArgs
): Promise<"success" | "username taken"> => {
  const encodedPassword = encodeURI(args.password);
  const encodedUsername = encodeURIComponent(args.username);
  const res = await axios.get(
    `${rootUrl}/signUp?username=${encodedUsername}&password=${encodedPassword}`
  );
  return res.data;
};
