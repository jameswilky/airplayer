import React from "react";
import CurrentTrack from "../../../components/CurrentTrack/CurrentTrack";
import List from "../../../components/List";
import AudioVisualizer from "../../../components/AudioVisualizer";
import { gameOvaImg } from "../../../images";
import { Container } from "../../../styles/Container";
import useSearch from "../../../hooks/useSearch/useSearch";
import { StyledItem, StyledList } from "./styles";

// TODO use paralax https://www.youtube.com/watch?v=P5zGTEGPpu4
export default function Home(props) {
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

  const { playlist, currentSong } = props.roomTracks;

  const nextTrack =
    playlist[
      playlist.indexOf(
        playlist.filter(track => track.uri === currentSong.uri)[0]
      ) + 1
    ];

  return (
    <Container>
      <CurrentTrack
        AudioVisualizer={AudioVisualizer}
        title={currentSong.name}
        artist={currentSong.artists[0].name}
        image={currentSong.getImages().medium.url}
        nextTrack={{ artist: nextTrack.artist, title: nextTrack.name }}
      ></CurrentTrack>
      <List items={playlist} Style={StyledList}>
        <ItemTemplate
          src={item => item.getImages().default.url}
          name={item => item.name}
          labels={item =>
            item
              .getLabels()
              .map(label => `${label} `)
              .slice(1, 3)
          }
        ></ItemTemplate>
      </List>
    </Container>
  );
}
