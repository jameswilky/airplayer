import React from "react";
import CurrentTrack from "../components/CurrentTrack";
import Playlist from "../components/Playlist";
import Footer from "../components/Footer";
import AudioVisualizer from "../components/AudioVisualizer";
import styled from "styled-components";
import { gameOvaImg } from "../images";

const Container = styled.div`
  color: whitesmoke;
  background-color: rgba(20, 20, 20, 1);
  font-size: 1.5rem;
`;

export default function MusicPlayer() {
  return (
    <Container>
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
