import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { apiSignIn } from "../../api/SignIn";
import { apiSignUp } from "../../api/SignUp";
import "./SignInArea.css";

export const SignInArea = () => {
  const [newUser, setNewUser] = useState(false);
  // const res = await axios.get(`${rootUrl}/test`);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    apiSignIn({ username, password });
  };

  const handleSignUp = () => {
    apiSignUp({ username, password });
  };

  return (
    <>
      <Heading my="50px">{newUser ? "Sign Up" : "Sign In"}</Heading>
      <Box
        className="mainBox"
        borderWidth="1px"
        borderRadius="50px"
        maxW="md"
        p="50px"
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={(newUser ? "Create a " : "") + "Username"}
        ></Input>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={(newUser ? "Create a " : "") + "Password"}
        ></Input>
        {!newUser ? (
          <>
            <Button colorScheme="blue" onClick={handleSignIn}>
              Submit
            </Button>
            <Button onClick={() => setNewUser(true)}>New User?</Button>
          </>
        ) : (
          <>
            <Button colorScheme="blue" onClick={handleSignUp}>
              Submit
            </Button>
            <Button onClick={() => setNewUser(false)}>Back</Button>
          </>
        )}
      </Box>
    </>
  );
};
