import React, { useState } from "react";

import SongList from "../../components/SongList";
import Input from "../../components/Input";

import useSearch from "../../hooks/useSearch";

import { Container, SearchBar, SearchResults } from "./styles";

export default function MusicSearchInterface() {
  const { query, setQuery, queryResults, toItems } = useSearch("");
  const { albums, tracks, artists, playlists } = toItems(queryResults);

  const createResults = (title, results) => (
    <>
      <h2>{title}</h2>
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </>
  );

  const Tracks = () => createResults("Songs", tracks);
  const Albums = () => createResults("Albums", albums);
  const Artists = () => createResults("Artists", artists);
  const Playlists = () => createResults("Playlists", playlists);

  return (
    <Container>
      <SearchBar>
        <Input value={query} setValue={setQuery}></Input>
      </SearchBar>
      <SearchResults>
        <Tracks></Tracks>
        <Albums></Albums>
        <Artists></Artists>
        <Playlists></Playlists>
      </SearchResults>
    </Container>
  );
}
