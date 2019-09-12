import React, { useState } from "react";

import SongList from "../../components/SongList";
import Input from "../../components/Input";

import useSearch from "../../hooks/useSearch";

// Modules/Utilities
import { getNestedProperty } from "../../helpers/ObjectUtils";
import { msToMinutes } from "../../helpers/TimeUtils";

// Images
import fallbackImage from "../../images/fallbackImage.png";

import {
  StyledContainer,
  StyledSearchBar,
  StyledSearchFilterContainer,
  StyledSearchResults,
  StyledButton,
  StyledResult,
  StyledResultItem,
  StyledChevron
} from "./styles";

export default function MusicSearchInterface() {
  // Local State
  const { query, setQuery, queryResults } = useSearch("");
  const { albums, tracks, artists, playlists } = getNestedProperty(
    "items",
    queryResults
  );
  const [selected, setSelected] = useState("");

  // Booleans
  const noResults =
    albums.length < 1 ||
    tracks.length < 1 ||
    artists.length < 1 ||
    playlists.length < 1;
  const noQuery = query === "";
  const filterOn = selected !== "";

  // Sub Components
  const ResultItem = ({ result, type }) => {
    const image =
      type === "Songs"
        ? result.album.images.length < 1
          ? fallbackImage
          : result.album.images.slice(-1)[0].url
        : result.images.length < 1
        ? fallbackImage
        : result.images.slice(-1)[0].url;

    return (
      // TODO, determine properties by each type
      <StyledResultItem>
        <img src={image}></img>
        <div>
          <h3>{result.name}</h3>
          <p>Song</p>
          <p>{result.artist}</p>
          <span>&#183;</span>
          <p>{msToMinutes(result.duration_ms)}</p>
        </div>
      </StyledResultItem>
    );
  };
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

  const Result = ({ title, results }) =>
    results && (!filterOn || selected === title) ? (
      <StyledResult>
        <h2 onClick={() => setSelected(selected === title ? "" : title)}>
          {filterOn ? "" : title}
        </h2>
        <StyledChevron
          visibility={filterOn ? "hidden" : "visible"}
          onClick={() => setSelected(selected === title ? "" : title)}
        ></StyledChevron>
        <ul>
          {results.slice(0, filterOn ? 20 : 4).map(result => (
            <li key={result.id}>
              <ResultItem result={result} type={title}></ResultItem>
            </li>
          ))}
        </ul>
      </StyledResult>
    ) : (
      <></>
    );
  // TODO put searchbar and results into there own components
  return (
    <StyledContainer>
      <StyledSearchBar>
        <Input value={query} setValue={setQuery}></Input>
        <StyledSearchFilterContainer>
          <RadioButton text={"Songs"}></RadioButton>
          <RadioButton text={"Playlists"}></RadioButton>
          <RadioButton text={"Artists"}></RadioButton>
          <RadioButton text={"Albums"}></RadioButton>
        </StyledSearchFilterContainer>
      </StyledSearchBar>
      <StyledSearchResults>
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
      </StyledSearchResults>
    </StyledContainer>
  );
}
