import { Box, Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiSignIn } from "../../api/SignIn";
import { apiSignUp } from "../../api/SignUp";
import "./SignInArea.css";
import { sha256 } from "js-sha256";

type SignInAreaProps = {
  onSignIn: (userId: string) => void;
  onSignOut: () => void;
};

export const SignInArea = (props: SignInAreaProps) => {
  const [newUser, setNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  useEffect(() => {
    const keyDownHandler = async (event: any) => {
      if (event.key === "Enter") {
        if (newUser) {
          await handleSignUp();
        } else {
          await handleSignIn();
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [username, password]);

  const toastError = (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 5000,
      position: "top-right",
    });
  };
  const toastSuccess = (message: string) => {
    toast({
      title: message,
      status: "success",
      duration: 5000,
      position: "top-right",
    });
  };

  const checkFieldFilled = (): boolean => {
    if (username == "") {
      toastError("Please enter your username");
      return false;
    }
    if (password == "") {
      toastError("Please enter your password");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!checkFieldFilled()) {
      return;
    }

    const hashedPassword = sha256(password);
    const res = await apiSignIn({ username, password: hashedPassword });
    if (res.split(" ")[0] == "success") {
      toastSuccess("Signed in.");
      props.onSignIn(res.split(" ")[1]);
    } else {
      toastError("User not found.");
      setUsername("");
      setPassword("");
    }
  };

  const handleSignUp = async () => {
    if (!checkFieldFilled()) {
      return;
    }

    const hashedPassword = sha256(password);
    const res = await apiSignUp({ username, password: hashedPassword });
    if (res.split(" ")[0] == "success") {
      toastSuccess("Signed Up");
      props.onSignIn(res.split(" ")[1]);
    } else if (res == "username taken") {
      toastError("Username taken");
    }
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
          type="password"
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
