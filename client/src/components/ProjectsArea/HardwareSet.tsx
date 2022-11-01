import { useState } from "react";
import axios from "axios";
import { Box, Button, Input, useToast } from "@chakra-ui/react";

export const HardwareSet = (props: {
  name: string;
  count: number;
  onChangeCount: (newCount: number) => Promise<void>;
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
    const newCount: number = count + parseInt(text);

    if (newCount > 100) {
      console.log("HERE?");
      toastError("Exceeds capacity.");
      return;
    }

    await props.onChangeCount(newCount);
    setText("");
    toastSuccess(`Checked in ${parseInt(text)} units.`);
  };

  const handleClickedCheckOut = async () => {
    if (!isInteger(text)) {
      toastError("Please enter an integer.");
      return;
    }
    const newCount = count - parseInt(text);
    if (newCount < 0) {
      toastError("Quantity requested exceeds quantity available.");
      return;
    }

    await props.onChangeCount(newCount);
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
