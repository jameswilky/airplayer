import React from "react";
import Input from "../Input/Input";
import { Wrapper, Container } from "./styles";
import SearchFilter from "../SearchFilter/SeachFilter";

export default function SearchBar({ query, setQuery, filter, setFilter }) {
  return (
    <Wrapper>
      <Container>
        <Input value={query} setValue={setQuery}></Input>
        <SearchFilter filter={filter} setFilter={setFilter}></SearchFilter>
      </Container>
    </Wrapper>
  );
}
