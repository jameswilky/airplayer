import React, { useEffect } from "react";
import { Background, Container, Sidebar, Header, Footer, Main } from "./styles";
import Home from "../Home/Home";

import SpotifyWebplayer from "../../../components/SpotifyWebplayer/SpotifyWebplayer";

import useRoom from "../../../hooks/useRoom";
import useAuth from "../../../hooks/useAuth";
import useRoomTracks from "../../../hooks/useRoomTracks";

export default function Room() {
  const { accessToken } = useAuth();

  const room = useRoom();
  const { roomTracks } = useRoomTracks(room);

  const {
    controller: { joinRoom }
  } = room;

  const playerReady =
    accessToken &&
    room.state &&
    room.state.currentSong &&
    roomTracks &&
    roomTracks.currentSong;

  const homeReady = room && room.state;
  useEffect(() => {
    joinRoom("5d47d90a191f0f30a0d73414");
  }, []);

  return (
    <Background>
      <Container>
        <Sidebar>
          <ul>
            <li>
              <b>Home</b>
            </li>
            <li>Search</li>
            <li>Library</li>
          </ul>
        </Sidebar>
        <Header>Search Bar || Login</Header>
        <Main>
          {/* Depends on Route*/}
          {homeReady && <Home room={room}></Home>}
        </Main>
        <Footer>
          {playerReady && (
            <SpotifyWebplayer
              token={accessToken}
              room={room}
              roomTracks={roomTracks}
            ></SpotifyWebplayer>
          )}
        </Footer>
      </Container>
    </Background>
  );
}
