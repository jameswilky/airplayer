import React, { useState } from "react";

import SongList from "../../components/SongList";
import Input from "../../components/Input";

import useSearch from "../../hooks/useSearch";

import { Container, SearchBar, SearchResults } from "./styles";

export default function MusicSearchInterface() {
  const { query, setQuery } = useSearch("");

  return (
    <Container>
      <SearchBar>
        <Input value={query} setValue={setQuery}></Input>
      </SearchBar>
      <SearchResults>
        <div>
          <h2>Songs</h2>
          <ul>
            <li>Track1</li>
            <li>Track2</li>
            <li>Track3</li>
          </ul>
        </div>
        <div>
          <h2>Artists</h2>
          <ul>
            <li>Artist1</li>
            <li>Artist2</li>
            <li>Artist3</li>
          </ul>
        </div>
        <div>
          <h2>Playlists</h2>
          <ul>
            <li>Playlist1</li>
            <li>playlist2</li>
            <li>Playlist3</li>
          </ul>
        </div>
        <div>
          <h2>Albums</h2>
          <ul>
            <li>Album1</li>
            <li>Album2</li>
            <li>Album3</li>
          </ul>
        </div>
      </SearchResults>
    </Container>
  );
}
