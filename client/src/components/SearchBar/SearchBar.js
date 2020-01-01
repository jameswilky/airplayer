import React from "react";
import { Wrapper, Container } from "./styles";
import SearchFilter from "../SearchFilter/SeachFilter";

export default function SearchBar({ query, setQuery, filter, setFilter }) {
  return (
    <Wrapper>
      <Container>
        <input
          placeholder={"Enter a query"}
          value={query}
          onChange={e => setQuery(e.target.value)}
        ></input>
        <SearchFilter filter={filter} setFilter={setFilter}></SearchFilter>
      </Container>
    </Wrapper>
  );
}
