import React, { useState } from "react";
import Script from "react-load-script";
import useWebplayer from "../../hooks/useWebplayer/";
import theme from "../../theme";
import VolumeSlider from "../VolumeSlider";
import AudioSlider from "../AudioSlider/AudioSlider";

import { Container, Body, Left, Right, Spinner } from "./styles";

import MusicController from "../MusicController";

export default function SpotifyWebplayer({
  auth,
  room,
  roomTracks,
  start,
  setStart
}) {
  const [scriptState, setScriptState] = useState({
    error: false
  });

  const duration = roomTracks.currentSong.duration_ms;

  const { loadScript, deviceState, queTrack, volume, setVolume } = useWebplayer(
    auth,
    room,
    start,
    duration
  );

  return (
    <>
      {loadScript && (
        <Script
          url="https://sdk.scdn.co/spotify-player.js"
          onError={() => setScriptState({ ...scriptState, error: true })}
          onLoad={() => {
            setScriptState({ ...scriptState, loaded: true });
          }}
        ></Script>
      )}

      {deviceState.ready ? (
        <Container>
          <AudioSlider
            duration={duration}
            playing={!deviceState.paused}
            lastSeek={deviceState.lastSeek}
            currentSong={deviceState.currentSong}
            seek={room.controller.seek}
          ></AudioSlider>
          <Body>
            <Left>
              <img
                src={roomTracks.currentSong.getImages().default.url}
                alt=""
              />
              <div>
                <h3>{roomTracks.currentSong.name}</h3>
                <p>
                  {roomTracks.currentSong
                    .getArtists()
                    .map(artist => artist.name)}
                </p>
              </div>
            </Left>
            <MusicController
              setStart={setStart}
              room={room}
              queTrack={queTrack}
              deviceState={deviceState}
            ></MusicController>
            <Right>
              <VolumeSlider
                volume={volume}
                setVolume={setVolume}
              ></VolumeSlider>
            </Right>
          </Body>
        </Container>
      ) : (
        <Spinner type="Bars" color={theme.primary} height={70} width={50} />
      )}
    </>
  );
}
