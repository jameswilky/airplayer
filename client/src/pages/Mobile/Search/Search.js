import React, { useState } from "react";

import Results from "../../../components/Results/Results";

import useSearch from "../../../hooks/useSearch/useSearch";

import { Container } from "../../../styles/Container";
import SearchBar from "../../../components/SearchBar/SearchBar";
export default function Search() {
  // Local State
  const { query, setQuery, queryResults } = useSearch("tobi");
  const { albums, tracks, artists, playlists } = queryResults;
  const [filter, setFilter] = useState("");

  return (
    <Container>
      <SearchBar
        query={query}
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
      ></SearchBar>
      <Results
        {...{
          query,
          filter,
          setFilter,

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
