import { useState } from "react";
import axios from "axios";
import { Box, Button, Input, useToast } from "@chakra-ui/react";

export const HardwareSet = (props: {
  name: string;
  count: number;
  onChangeCount: (change: number) => Promise<void>;
  projectId: string;
}) => {
  const count = props.count;

  const [text, setText] = useState("");

  const toast = useToast();

  function isInteger(str: string) {
    if (str.match(/^-?[0-9]+$/)) {
      return true;
    }
    return false;
  }

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

  const handleClickedCheckIn = async () => {
    if (!isInteger(text)) {
      toastError("Please enter an integer.");
      return;
    }
    if (parseInt(text) < 0) {
      toastError("Please enter a positive integer.");
      return;
    }
    const change = parseInt(text);
    const newCount: number = count + change;

    if (newCount > 100) {
      toastError("Exceeds capacity.");
      return;
    }

    await props.onChangeCount(change);
    setText("");
    toastSuccess(`Checked in ${parseInt(text)} units.`);
  };

  const handleClickedCheckOut = async () => {
    if (!isInteger(text)) {
      toastError("Please enter an integer.");
      return;
    }
    if (parseInt(text) < 0) {
      toastError("Please enter a positive integer.");
      return;
    }
    const change = -1 * parseInt(text);
    const newCount = count + change;
    if (newCount < 0) {
      toastError("Quantity requested exceeds quantity available.");
      return;
    }

    await props.onChangeCount(change);
    setText("");
    toastSuccess(`Checked out ${parseInt(text)} units.`);
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDir="row"
      gap="25px"
      className="HardwareSet"
    >
      <div>{props.name}</div>
      <div>
        {" "}
        <b>Capacity:</b> 100
      </div>
      <div>
        {" "}
        <b>Available:</b> {count}{" "}
      </div>
      <Input
        placeholder="Number to Request"
        w="200px"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Button colorScheme="green" onClick={handleClickedCheckIn}>
        Check In
      </Button>
      <Button colorScheme="blue" onClick={handleClickedCheckOut}>
        Check Out
      </Button>
    </Box>
  );
};
