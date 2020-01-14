import React from "react";
import CurrentTrack from "../../../components/CurrentTrack/CurrentTrack";
import List from "../../../components/List";
import AudioVisualizer from "../../../components/AudioVisualizer";
import { Container, StyledItem, StyledList, Spinner } from "./styles";
import theme from "../../../theme";

// TODO use paralax https://www.youtube.com/watch?v=P5zGTEGPpu4
export default function Home(props) {
  const ItemTemplate = ({ src, name, labels }) => (
    <StyledItem>
      {src && <img src={src}></img>}
      <div>
        <h3>{name}</h3>
        <ul>{labels && labels.map((label, i) => <p key={i}>{label}</p>)}</ul>
      </div>
    </StyledItem>
  );

  const { playlist, currentSong, filtered, generated } = props.roomTracks;

  const nextTrack = (playlist &&
    playlist[
      playlist.indexOf(
        playlist.filter(track => track.uri === currentSong.uri)[0]
      ) + 1
    ]) || { artist: null, title: null };

  return (
    <Container>
      {currentSong && playlist ? (
        <>
          {" "}
          <CurrentTrack
            AudioVisualizer={AudioVisualizer}
            title={currentSong.name}
            artist={currentSong.artists[0].name}
            image={currentSong.getImages().medium}
            nextTrack={{ artist: nextTrack.artist, title: nextTrack.name }}
          ></CurrentTrack>{" "}
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
          <List items={filtered} Style={StyledList}>
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
          </List>{" "}
          <List items={generated} Style={StyledList}>
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
        </>
      ) : (
        <Spinner type="Bars" color={theme.white}></Spinner>
      )}
    </Container>
  );
}
