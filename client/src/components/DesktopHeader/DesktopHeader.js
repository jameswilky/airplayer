import React, { useEffect } from "react";
import SearchFilter from "../SearchFilter/SeachFilter";
import { Container, Wrapper, SearchBar, ProfileIcon } from "./styles";

export default function DesktopHeader({ filter, setFilter, query, setQuery }) {
  return (
    <Container>
      <Wrapper>
        <SearchBar
          value={query}
          placeholder="Search"
          onChange={e => setQuery(e.target.value)}
        ></SearchBar>
        <SearchFilter filter={filter} setFilter={setFilter}></SearchFilter>
      </Wrapper>
      <ProfileIcon></ProfileIcon>
    </Container>
  );
}
