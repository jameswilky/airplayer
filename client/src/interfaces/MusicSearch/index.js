import React, { useState } from "react";
import SongList from "../../components/SongList";
import Input from "../../components/Input";
import { SearchBar, Container } from "./styles";
import useSearch from "../../hooks/useSearch";

export default function MusicSearchInterface() {
  const { query, setQuery } = useSearch("");

  return (
    <Container>
      <SearchBar>
        <Input value={query} setValue={setQuery}></Input>
      </SearchBar>
    </Container>
  );
}
