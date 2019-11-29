import React, { useEffect, useState } from "react";
import { Container, Success, Error } from "./styles";
import useTimeout from "../../hooks/useTimeout";

export default function Message({ success, error }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState({ success: "", error: "" });

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
  const generateErrorMessage = error => {
    switch (error.type) {
      case "ADD_TRACK":
        return "Track already in playlist";
      case "REMOVE_TRACK":
        return "Track not in playlist";
    }
  };

  // set SUccess message when successful event occurs
  useEffect(() => {
    if (success) {
      setMessage({ success: generateSuccessMessage(success), error: "" });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setMessage({ success: "", error: generateErrorMessage(error) });
    }
  }, [error]);

  // After 3 seconds remove success/error message
  useTimeout(() => {
    if (message.success || message.error) {
      setMessage({ error: "", success: "" });
    }
  }, (message.success || message.error) && 3000);

  return (
    <Container>
      <Error active={message.error}>{message.error}</Error>
      <Success active={message.success}>{message.success}</Success>
    </Container>
  );
}
