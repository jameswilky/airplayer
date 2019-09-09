import React from "react";
import CurrentTrack from "../components/CurrentTrack";
import Playlist from "../components/Playlist";
import AudioVisualizer from "../components/AudioVisualizer";
import { gameOvaImg } from "../images";

export default function MusicPlayerInterface() {
  return (
    <>
      <CurrentTrack
        AudioVisualizer={AudioVisualizer}
        title="Game Ova"
        artist="Tobi Lou"
        image={gameOvaImg}
        nextTrack={{ artist: "Darude", title: "Sandstorm" }}
      ></CurrentTrack>
      <Playlist></Playlist>
    </>
  );
}
