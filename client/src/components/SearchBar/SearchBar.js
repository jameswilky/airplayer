import React from "react";
import Input from "../Input/Input";
import { Wrapper, SearchFilterContainer, Button, Container } from "./styles";

export default function SearchBar({ query, setQuery, selected, setSelected }) {
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
    <Wrapper>
      <Container>
        <Input value={query} setValue={setQuery}></Input>
        <SearchFilterContainer>
          <RadioButton text={"Tracks"}></RadioButton>
          <RadioButton text={"Playlists"}></RadioButton>
          <RadioButton text={"Artists"}></RadioButton>
          <RadioButton text={"Albums"}></RadioButton>
        </SearchFilterContainer>
      </Container>
    </Wrapper>
  );
}
