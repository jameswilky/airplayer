import React, { useState, useEffect } from "react";
import { Container, StyledChevron } from "./styles";

// Components
import SongList from "../../../components/SongList/SongList";
import Carousel from "../../../components/Carousel/Carousel";
import SearchBar from "../../../components/SearchBar/SearchBar";

// Hooks
import useSearch from "../../../hooks/useSearch/useSearch";

import useLibrary from "../../../hooks/useLibrary";

export default function Library() {
  const [selected, setSelected] = useState("");

  const { query, setQuery, queryResults } = useLibrary();
  const { albums, tracks, artists, playlists } = queryResults;

  console.log(queryResults);
  useEffect(() => setQuery("Cha Cha"));
  return (
    <Container>
      <SearchBar></SearchBar>
      <Carousel items={tracks}></Carousel>
      {selected === "" ? (
        <></>
      ) : (
        <StyledChevron onClick={() => setSelected("")}></StyledChevron>
      )}
      <SongList
        {...{
          query,
          selected,
          setSelected,
          limit: 3,
          results: { albums, tracks, artists, playlists }
        }}
      ></SongList>{" "}
    </Container>
  );
}
