import React, { useState } from "react";

import Results from "../../../components/Results/Results";

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
      <Results
        {...{
          query,
          selected,
          setSelected,

          results: [
            { title: "Albums", items: albums },
            { title: "Artists", items: artists },
            { title: "Playlists", items: playlists },
            { title: "Tracks", items: tracks }
          ]
        }}
      ></Results>
    </Container>
  );
}
