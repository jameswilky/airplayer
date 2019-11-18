import React from "react";
import { Container, Button } from "./styles";

export default function SeachFilter({ selected, setSelected }) {
  const RadioButton = ({ text }) => {
    return (
      <Button
        active={selected === text}
        onClick={() => {
          setSelected(selected === text ? "" : text);
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
