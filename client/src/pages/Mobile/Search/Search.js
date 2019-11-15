import React, { useState } from "react";

import SongList from "../../../components/SongList/SongList";

import useSearch from "../../../hooks/useSearch/useSearch";

import { Container } from "../../../styles/Container";
import SearchBar from "../../../components/SearchBar/SearchBar";
export default function Search() {
  // Local State
  const { query, setQuery, queryResults } = useSearch("tobi");
  const { albums, tracks, artists, playlists } = queryResults;
  const [selected, setSelected] = useState("");

  return (
    <Container>
      <SearchBar
        query={query}
        setQuery={setQuery}
        selected={selected}
        setSelected={setSelected}
      ></SearchBar>
      <SongList
        {...{
          query,
          selected,
          setSelected,

          results: { albums, tracks, artists, playlists }
        }}
      ></SongList>
    </Container>
  );
}
