import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { SignInArea } from "./components/SignInArea/SignInArea";
import { ProjectsArea } from "./components/ProjectsArea/ProjectsArea";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSignIn = (userId: string) => {
    setUserId(userId);
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <div className="app">
      {isSignedIn ? (
        <ProjectsArea userId={userId}></ProjectsArea>
      ) : (
        <SignInArea
          onSignOut={handleSignOut}
          onSignIn={handleSignIn}
        ></SignInArea>
      )}
    </div>
  );
}

export default App;
