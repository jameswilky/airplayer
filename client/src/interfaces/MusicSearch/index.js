import React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import SongList from "../../components/SongList";

export default function MusicSearchInterface() {
  const Container = styled.div`
    height: calc(100vh - 50px);
    position: relative;
  `;
  return (
    <Container>
      <SearchBar></SearchBar>
      <SongList></SongList>
    </Container>
  );
}
