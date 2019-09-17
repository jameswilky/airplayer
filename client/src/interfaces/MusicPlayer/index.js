import React from "react";
import CurrentTrack from "../../components/CurrentTrack";
import List from "../../components/List";
import AudioVisualizer from "../../components/AudioVisualizer";
import { gameOvaImg } from "../../images";
import { Container } from "../../globalStyles";

export default function MusicPlayerInterface() {
  return (
    <Container>
      <CurrentTrack
        AudioVisualizer={AudioVisualizer}
        title="Game Ova"
        artist="Tobi Lou"
        image={gameOvaImg}
        nextTrack={{ artist: "Darude", title: "Sandstorm" }}
      ></CurrentTrack>
      <List
      // {...{ items: [], styles: { StyledItems, StyledItem, StyledSubItem } }}
      ></List>
    </Container>
  );
}
