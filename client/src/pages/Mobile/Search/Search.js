import React, { useState } from "react";

import SearchBar from "../../../components/SearchBar/SearchBar";
import SongList from "../../../components/SongList";
import styled from "styled-components";
import isChromeMobile from "../../../modules/isChromeMobile";

import useFind from "../../../hooks/useFind";
import useSearch from "../../../hooks/useSearch/useSearch";

const Container = styled.div`
  height: ${() =>
    isChromeMobile() ? `calc(92vh - 56px)` : "calc(100vh - 56px)"};
  position: relative;
`;

export default function Search(props) {
  const { query, setQuery, queryResults } = useSearch(props.auth);
  const [findResult, setFindQuery] = useFind(props.auth);

  const nextProps = {
    ...props,
    results: queryResults,
    foundTracks: findResult.tracks,
    foundTracksName: findResult.name,
    setFindQuery
  };
  return (
    <Container>
      <SearchBar
        query={query}
        setQuery={setQuery}
        filter={props.filter}
        setFilter={props.setFilter}
      ></SearchBar>

      <SongList {...nextProps}></SongList>
    </Container>
  );
}
