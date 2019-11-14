import React, { useState } from "react";

import SongList from "../../../components/SongList/SongList";
import Input from "../../../components/Input/Input";

import useSearch from "../../../hooks/useSearch/useSearch";
import StyledSearchBar from "../../../styles/StyledSearchBar";

import {
  StyledContainer,
  StyledSearchFilterContainer,
  StyledButton
} from "./styles";

export default function Search() {
  // Local State
  const { query, setQuery, queryResults } = useSearch("tobi");
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
      <StyledSearchBar>
        <Input value={query} setValue={setQuery}></Input>
        <StyledSearchFilterContainer>
          <RadioButton text={"Tracks"}></RadioButton>
          <RadioButton text={"Playlists"}></RadioButton>
          <RadioButton text={"Artists"}></RadioButton>
          <RadioButton text={"Albums"}></RadioButton>
        </StyledSearchFilterContainer>
      </StyledSearchBar>
      <SongList
        {...{
          top: "150px",
          query,
          selected,
          setSelected,

          results: { albums, tracks, artists, playlists }
        }}
      ></SongList>
    </StyledContainer>
  );
}
