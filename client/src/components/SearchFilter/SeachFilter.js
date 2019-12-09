import React from "react";
import { Container, Button } from "./styles";

export default function SeachFilter({ filter, setFilter }) {
  const RadioButton = ({ text }) => {
    return (
      <Button
        active={filter === text}
        onClick={() => {
          setFilter(filter === text ? "" : text);
        }}
      >
        {text}
      </Button>
    );
  };
  return (
    <Container>
      <RadioButton text={"Tracks"}></RadioButton>
      <RadioButton text={"Playlists"}></RadioButton>
      <RadioButton text={"Artists"}></RadioButton>
      <RadioButton text={"Albums"}></RadioButton>
    </Container>
  );
}
