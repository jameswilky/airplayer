import React, { useState } from "react";

import SearchBar from "../../../components/SearchBar/SearchBar";
import SongList from "../../../components/SongList";
import styled from "styled-components";
import isChromeMobile from "../../../modules/isChromeMobile";
export default function Search(props) {
  const Container = styled.div`
    height: ${() =>
      isChromeMobile() ? `calc(92vh - 56px)` : "calc(100vh - 56px)"};
    position: relative;
  `;
  return (
    <Container>
      <SearchBar
        query={props.query}
        setQuery={props.setSearchQuery}
        filter={props.filter}
        setFilter={props.setFilter}
      ></SearchBar>
      <SongList {...props}></SongList>
    </Container>
  );
}
