import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import MusicPlayerInterface from "../interfaces/MusicPlayer";
import MusicSearchInterface from "../interfaces/MusicSearch";
import MusicLibraryInterface from "../interfaces/MusicLibrary";
import Footer from "../components/Footer";
import styled from "styled-components";

import useRoom from "../hooks/useRoom";

const Container = styled.div`
  color: whitesmoke;
  background-color: rgba(20, 20, 20, 1);
  font-size: 1.5rem;
`;

export default function RoomInterface(props) {
  const roomId = props.location.pathname
    .split("/")
    .slice(-1)
    .pop();

  const {
    state,
    controller: { addTrack, joinRoom },
    error
  } = useRoom();

  useEffect(() => {
    joinRoom(roomId);
  }, []);

  const path = props.match.path;

  return (
    <Container>
      {" "}
      <Route exact path={`${path}`} component={MusicPlayerInterface}></Route>
      <Route path={`${path}/search`} component={MusicSearchInterface}></Route>
      <Route path={`${path}/library`} component={MusicLibraryInterface}></Route>
      <Footer />
    </Container>
  );
}
