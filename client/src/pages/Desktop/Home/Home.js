import React from "react";
import { Container } from "./styles";
import { Redirect } from "react-router-dom";

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
      {/* <h2>Your Favourite tracks</h2>
      <Carousel
        key={Math.random()}
        items={topTracks}
        addItem={room.controller.addTrack}
        removeItem={room.controller.removeTrack}
        selectedItems={roomTracks.playlist}
      ></Carousel> */}

      <h2>What's up Next</h2>
      {roomTracks.playlist && (
        <List items={roomTracks.playlist}>
          <ListItem
            Style={StyledListItem}
            src={item => item.getImages().default.url}
            name={item => item.name}
            labels={item => item.getArtists().map(artist => artist.name)}
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
      <h2>Room Favourites</h2>
      {roomTracks.filtered && (
        <List items={roomTracks.filtered}>
          <ListItem
            Style={StyledListItem}
            src={item => item.getImages().default.url}
            name={item => item.name}
            labels={item => item.getArtists().map(artist => artist.name)}
            filter={item =>
              item.uri === roomTracks.currentSong.uri ? "1" : ""
            }
            onClick={play}
          ></ListItem>
        </List>
      )}
      <h2>Recommended</h2>
      {roomTracks.generated && (
        <List items={roomTracks.generated}>
          <ListItem
            Style={StyledListItem}
            src={item => item.getImages().default.url}
            name={item => item.name}
            labels={item => item.getArtists().map(artist => artist.name)}
            filter={item =>
              item.uri === roomTracks.currentSong.uri ? "1" : ""
            }
            onClick={play}
          ></ListItem>
        </List>
      )}
    </Container>
  );
}
