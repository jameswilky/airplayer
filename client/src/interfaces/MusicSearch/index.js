import React, { useState } from "react";

import SongList from "../../components/SongList";
import Input from "../../components/Input";

import useSearch from "../../hooks/useSearch";
import useFilter from "../../hooks/useFilter";

import { getNestedProperty } from "../../helpers/ObjectUtils";

import {
  Container,
  SearchBar,
  SearchFilterContainer,
  SearchResults,
  StyledButton
} from "./styles";

export default function MusicSearchInterface() {
  const { query, setQuery, queryResults } = useSearch("");

  const { albums, tracks, artists, playlists } = getNestedProperty(
    "items",
    queryResults
  );

  const [selected, setSelected] = useState("");

  const noResults =
    albums.length < 1 ||
    tracks.length < 1 ||
    artists.length < 1 ||
    playlists.length < 1;
  const noQuery = query === "";

  const Result = ({ title, results }) =>
    results ? (
      <>
        <h2>{title}</h2>
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </>
    ) : (
      <></>
    );

  const Button = ({ text }) => {
    const [isActive, setIsActive] = useState(selected === text);
    return (
      <StyledButton
        active={isActive}
        onClick={() => {
          setIsActive(!isActive);
          setSelected(text);
        }}
      >
        {text}
      </StyledButton>
    );
  };

  return (
    <Container>
      <SearchBar>
        <Input value={query} setValue={setQuery}></Input>
        <SearchFilterContainer>
          <Button text={"Songs"}></Button>
          <Button text={"Playlists"}></Button>
          <Button text={"Artists"}></Button>
          <Button text={"Albums"}></Button>
        </SearchFilterContainer>
      </SearchBar>
      <SearchResults>
        {noQuery ? (
          `Please enter a query`
        ) : noResults ? (
          `No results matching ${query}`
        ) : (
          <>
            <Result title="Songs" results={tracks}></Result>
            <Result title="Artists" results={artists}></Result>
            <Result title="Playlists" results={playlists}></Result>
            <Result title="Albums" results={albums}></Result>
          </>
        )}
      </SearchResults>
    </Container>
  );
}
