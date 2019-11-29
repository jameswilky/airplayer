import React from "react";
import { Container } from "./styles";

// Components
import Carousel from "../../../components/Carousel/Carousel";
import List from "../../../components/List";
import ListItem from "../../../components/ListItem";

import StyledListItem from "../../../styles/StyledListItem";

export default function Home({ room, roomTracks, topTracks, setStartAudio }) {
  const play = (e, item) => {
    room.controller.play(item.uri);
    setStartAudio(true);
  };

  return (
    <Container>
      <h2>Recommended Tracks</h2>
      <Carousel
        items={topTracks}
        addTrack={room.controller.addTrack}
      ></Carousel>

      <h2>What's up Next</h2>
      {roomTracks.playlist && (
        <List items={roomTracks.playlist}>
          <ListItem
            Style={StyledListItem}
            src={item => item.getImages().default.url}
            name={item => item.name}
            labels={item => item.getLabels()}
            filter={item =>
              item.uri === roomTracks.currentSong.uri ? "1" : ""
            }
            onClick={play}
            button={item => (
              <button
                onClick={e => {
                  e.stopPropagation();
                  room.controller.removeTrack(item.uri);
                }}
              >
                {" "}
                x
              </button>
            )}
          ></ListItem>
        </List>
      )}
    </Container>
  );
}
