import React, { useState } from "react";

import SongList from "../../components/SongList2";
import Input from "../../components/Input";

import useSearch from "../../hooks/useSearch/";

// Modules/Utilities
import SpotifyHelper from "../../modules/SpotifyHelper/SpotifyHelper";

import {
  StyledContainer,
  StyledSearchBar,
  StyledSearchFilterContainer,
  StyledButton
} from "./styles";

export default function MusicSearchInterface() {
  // Local State
  const { query, setQuery, queryResults } = useSearch("");
  const { albums, tracks, artists, playlists } = queryResults;
  const [selected, setSelected] = useState("");

  // Sub Components
  const RadioButton = ({ text }) => {
    return (
      <StyledButton
        active={selected === text}
        onClick={() => {
          setSelected(selected === text ? "" : text);
        }}
      >
        {text}
      </StyledButton>
    );
  };

  return (
    <StyledContainer>
      {/* <StyledSearchBar>
        <Input value={query} setValue={setQuery}></Input>
        <StyledSearchFilterContainer>
          <RadioButton text={"Songs"}></RadioButton>
          <RadioButton text={"Playlists"}></RadioButton>
          <RadioButton text={"Artists"}></RadioButton>
          <RadioButton text={"Albums"}></RadioButton>
        </StyledSearchFilterContainer>
      </StyledSearchBar> */}
      {/* <SongList
        {...{
          top: "150px",
          query,
          selected,
          setSelected,

          results: { albums, tracks, artists, playlists }
        }}
      ></SongList> */}
      {/* <SongList
        {...{ results: { albums, tracks, artists, playlists } }}
      ></SongList> */}
    </StyledContainer>
  );
}
