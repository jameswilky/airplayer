import React, { useState, useEffect } from "react";
import { Container, StyledChevron } from "./styles";

// Components
import Results from "../../../components/Results/Results";
import Carousel from "../../../components/Carousel/Carousel";
import SearchBar from "../../../components/SearchBar/SearchBar";
import List from "../../../components/List";
import ListItem from "../../../components/ListItem";
import useRoomTracks from "../../../hooks/useRoomTracks";

import StyledListItem from "../../../styles/StyledListItem";

// Hooks
import useSearch from "../../../hooks/useSearch/useSearch";

import useLibrary from "../../../hooks/useLibrary";
import useRoom from "../../../hooks/useRoom";

export default function Home({ room, roomTracks, topTracks }) {
  const play = (e, item) => {
    room.controller.play(item.uri);
  };

  return (
    <Container>
      <h2>Recommended Tracks</h2>
      <Carousel items={topTracks}></Carousel>

      <h2>What's up Next</h2>
      {roomTracks.playlist && (
        <List items={roomTracks.playlist}>
          <ListItem
            Style={StyledListItem} // TODO fix
            src={item => item.getImages().default.url}
            name={item => item.name}
            labels={item => item.getLabels()}
            selected={item => item.uri == roomTracks.currentSong.uri}
            onClick={play}
          ></ListItem>
        </List>
      )}
    </Container>
  );
}
