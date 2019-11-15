import React from "react";
import CurrentTrack from "../../../components/CurrentTrack/CurrentTrack";
import List from "../../../components/List";
import AudioVisualizer from "../../../components/AudioVisualizer";
import { gameOvaImg } from "../../../images";
import { Container } from "../../../styles/Container";
import useSearch from "../../../hooks/useSearch/useSearch";
import { StyledItem, StyledList } from "./styles";

// TODO use paralax https://www.youtube.com/watch?v=P5zGTEGPpu4
export default function Home() {
  const { query, setQuery, queryResults } = useSearch("");
  const { albums, tracks, artists, playlists } = queryResults;

  const ItemTemplate = ({ src, name, labels }) => (
    <StyledItem>
      {src && <img src={src}></img>}
      <div>
        <h3>{name}</h3>
        <ul>{labels && labels.map((label, i) => <p key={i}>{label}</p>)}</ul>
      </div>

      <button>{"+"}</button>
    </StyledItem>
  );
  return (
    <Container>
      <CurrentTrack
        AudioVisualizer={AudioVisualizer}
        title="Game Ova"
        artist="Tobi Lou"
        image={gameOvaImg}
        nextTrack={{ artist: "Darude", title: "Sandstorm" }}
      ></CurrentTrack>
      <List items={tracks} Style={StyledList}>
        <ItemTemplate
          src={item => item.getImages().default.url}
          name={item => item.name}
          labels={item => item.getLabels()}
        ></ItemTemplate>
      </List>
    </Container>
  );
}
