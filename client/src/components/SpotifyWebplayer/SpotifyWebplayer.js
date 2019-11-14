import React, { useState } from "react";
import Script from "react-load-script";
import useWebplayer from "../../hooks/useWebplayer";
import theme from "../../theme";
import VolumeSlider from "../VolumeSlider";
import AudioSlider from "../AudioSlider/AudioSlider";

import { Container, Body, Left, Right, Spinner } from "./styles";
import useRoomTracks from "../../hooks/useRoomTracks";

import MusicController from "../MusicController";

export default function SpotifyWebplayer({ token, room }) {
  const [scriptState, setScriptState] = useState({
    error: false
  });

  const [start, setStart] = useState(false);

  const [volume, setVolume] = useState(0);

  const { roomTracks } = useRoomTracks(room);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const duration =
    roomTracks && roomTracks.currentSong && roomTracks.currentSong.duration_ms;

  const { loadScript, deviceState, queTrack } = useWebplayer(
    token,
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
            deviceState={deviceState}
            seek={room.controller.seek}
          ></AudioSlider>
          <Body>
            <Left>
              <img
                src={roomTracks.currentSong.getImages().default.url}
                alt=""
              />
              <div>
                <h3>{roomTracks.currentSong.getArtists()[0].name}</h3>
                <p>{roomTracks.currentSong.getLabels()}</p>
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
                show={showVolumeSlider}
                setShow={setShowVolumeSlider}
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
