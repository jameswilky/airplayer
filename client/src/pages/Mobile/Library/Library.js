import React, { useState, useEffect } from "react";
import { Container, StyledChevron } from "./styles";

//Components
import SongList from "../../../components/SongList/SongList";
import Carousel from "../../../components/Carousel/Carousel";

import useSearch from "../../../hooks/useSearch/useSearch";
import SearchBar from "../../../components/SearchBar/SearchBar";
export default function Library() {
  const { query, setQuery, queryResults } = useSearch("");
  const { albums, tracks, artists, playlists } = queryResults;

  const [selected, setSelected] = useState("");

  useEffect(() => setQuery("tobi"));

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
