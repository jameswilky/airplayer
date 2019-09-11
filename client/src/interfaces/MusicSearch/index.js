import React, { useState } from "react";

import SongList from "../../components/SongList";
import Input from "../../components/Input";

import useSearch from "../../hooks/useSearch";

import { Container, SearchBar, SearchResults } from "./styles";

const toItems = results =>
  Object.assign(
    {},
    ...Object.entries(results).map(entry => {
      return entry[1] === null
        ? { [entry[0]]: [] }
        : {
            [entry[0]]: Object.values({ ...entry[1].items })
          };
    })
  );

export default function MusicSearchInterface() {
  const { query, setQuery, queryResults } = useSearch("");
  const { albums, tracks, artists, playlists } = toItems(queryResults);

  const noResults = !albums || !tracks || !artists || !playlists;
  const noQuery = query === "";

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

  const Songs = () => (tracks ? createResults("Songs", tracks) : null);
  const Albums = () => (albums ? createResults("Albums", albums) : null);
  const Artists = () => (artists ? createResults("Artists", artists) : null);
  const Playlists = () =>
    playlists ? createResults("Playlists", playlists) : null;

  return (
    <Container>
      <SearchBar>
        <Input value={query} setValue={setQuery}></Input>
      </SearchBar>
      <SearchResults>
        {noQuery ? (
          `Please enter a query`
        ) : noResults ? (
          `No results matching ${query}`
        ) : (
          <>
            <Songs></Songs>
            <Albums></Albums>
            <Artists></Artists>
            <Playlists></Playlists>
          </>
        )}
      </SearchResults>
    </Container>
  );
}
