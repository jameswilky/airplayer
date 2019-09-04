import React from "react";
import CurrentTrack from "../components/CurrentTrack";
import Playlist from "../components/Playlist";
import Footer from "../components/Footer";
import AudioVisualizer from "../components/AudioVisualizer";
import styled from "styled-components";
import { gameOvaImg } from "../images";

import useRoom from "../hooks/useRoom";

const Container = styled.div`
  color: whitesmoke;
  background-color: rgba(20, 20, 20, 1);
  font-size: 1.5rem;
`;

export default function MusicPlayer() {
  const {
    state,
    controller: { joinRoom, addTrack },
    error
  } = useRoom();
  console.log(state, error);

  return (
    <Container>
      <button onClick={() => joinRoom("5d47d90a191f0f30a0d73414")}>
        Join Room
      </button>

      <button onClick={() => addTrack("8090")}>add Track</button>
      <CurrentTrack
        AudioVisualizer={AudioVisualizer}
        title="Game Ova"
        artist="Tobi Lou"
        image={gameOvaImg}
        nextTrack={{ artist: "Darude", title: "Sandstorm" }}
      />
      <Playlist />
      <Footer />
    </Container>
  );
}
