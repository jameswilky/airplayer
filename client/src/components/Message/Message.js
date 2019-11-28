import React, { useEffect, useState } from "react";
import { Container, Success, Error } from "./styles";
import useTimeout from "../../hooks/useTimeout";

export default function Message({ success, error }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateSuccessMessage = success => {
    switch (success.type) {
      case "ADD_TRACK":
        return "Added track to playlist";
      case "REMOVE_TRACK":
        return "Removed Track from playlist";
      default:
        return "";
    }
  };

  // set SUccess message when successful event occurs
  useEffect(() => {
    if (success) setSuccessMessage(generateSuccessMessage(success));
  }, [success]);

  // After 3 seconds remove success message
  useTimeout(() => {
    if (successMessage) {
      console.log("test");
      setSuccessMessage("");
    }
  }, successMessage && 3000);

  // Set Error Message when error occurs
  useEffect(() => {
    if (error) setErrorMessage(`Error : ${error}`);
  }, [error]);

  // After 3 seconds, remove error
  useTimeout(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, errorMessage && 3000);

  return (
    <Container active={successMessage || errorMessage}>
      <Error>{errorMessage}</Error>
      <Success>{successMessage}</Success>
    </Container>
  );
}
