import React from "react";
import styled from "styled-components";

import {
  IoIosSkipBackward,
  IoIosPlay,
  IoIosSkipForward,
  IoIosPause
} from "react-icons/io";

const Container = styled.div`
  color: ${props => props.theme.primary};
  font-size: 1.75rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: space-between;
  justify-items: center;
  width: 240px;
  align-self: center;
  justify-self: center;
  text-align: center;
  text-justify: center;
  & > * {
    cursor: pointer;
  }

  & > :nth-child(odd) {
    margin-top: 0.625rem;
  }
  & > :nth-child(2) {
    font-size: 3rem;
  }
`;

export default function MusicController({
  room,
  queTrack,
  setStart,
  deviceState
}) {
  const isFirstTrack =
    room.state.playlist
      .map(track => track.uri)
      .indexOf(room.state.currentSong.uri) === 0;

  const isLastTrack =
    room.state.playlist
      .map(track => track.uri)
      .indexOf(room.state.currentSong.uri) ===
    room.state.playlist.length - 1;

  return (
    <Container>
      {isFirstTrack ? (
        <div></div>
      ) : (
        <IoIosSkipBackward onClick={() => queTrack(-1)}></IoIosSkipBackward>
      )}

      {deviceState.paused ? (
        <IoIosPlay
          onClick={() => {
            room.controller.resume();
            setStart(true);
          }}
        ></IoIosPlay>
      ) : (
        <IoIosPause
          onClick={() => {
            room.controller.pause();
          }}
        ></IoIosPause>
      )}
      {isLastTrack ? (
        <div></div>
      ) : (
        <IoIosSkipForward onClick={() => queTrack(1)}></IoIosSkipForward>
      )}
    </Container>
  );
}
