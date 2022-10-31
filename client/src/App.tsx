import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { SignInArea } from "./components/SignInArea/SignInArea";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="app">{isSignedIn ? <></> : <SignInArea></SignInArea>}</div>
  );
}

export default App;
