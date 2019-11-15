import React from "react";
import styled from "styled-components";
import Carousel from "../../../components/Carousel/Carousel";
import List from "../../../components/List";
import ListItem from "../../../components/ListItem";
import StyledListItem from "../../../styles/StyledListItem";
import useSearch from "../../../hooks/useSearch/useSearch";
import useRoomTracks from "../../../hooks/useRoomTracks";

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: calc(50% - 62px) 1fr;
  grid-template-rows: 1fr 2fr;
  grid-gap: ${props => 2 * props.theme.unit + "px"};
`;

const CarouselContainer = styled.div`
  grid-column: span 2;

  & > h2 {
    padding-left: ${props => 1.5 * props.theme.unit + "px"};
  }
`;

const RoomPlaylist = styled.div`
  & > h2 {
    margin-bottom: ${props => 2 * props.theme.unit + "px"};
  }
  overflow-y: scroll;

  padding: ${props => 1 * props.theme.unit + "px"};
  background-color: ${props => props.theme.lightestGray};
`;

export default function Home({ room }) {
  const { queryResults } = useSearch();
  const { roomTracks } = useRoomTracks(room);
  const play = (e, item) => {
    room.controller.play(item.uri);
  };

  return (
    <Container>
      <CarouselContainer>
        <h2>Recommended for you</h2>
        <Carousel items={queryResults.tracks}></Carousel>
      </CarouselContainer>
      <RoomPlaylist>
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
      </RoomPlaylist>
      <RoomPlaylist>
        <h2>Room Members</h2>
      </RoomPlaylist>
    </Container>
  );
}
