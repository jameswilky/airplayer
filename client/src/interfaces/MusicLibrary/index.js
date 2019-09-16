import React, { useState, useEffect } from "react";
import { StyledContainer, StyledChevron } from "./styles";

//Components
import SongList from "../../components/SongList/";

import useSearch from "../../hooks/useSearch/";

// Modules/Utilities
import { getNestedProperty } from "../../helpers/ObjectUtils";

export default function MusicLibraryInterface() {
  const Carousel = () => <div></div>;
  const { query, setQuery, queryResults } = useSearch("");
  const { albums, tracks, artists, playlists } = getNestedProperty(
    "items",
    queryResults
  );
  const [selected, setSelected] = useState("");

  useEffect(() => setQuery("tobi"));

  return (
    <StyledContainer>
      <Carousel></Carousel>
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
    </StyledContainer>
  );
}
