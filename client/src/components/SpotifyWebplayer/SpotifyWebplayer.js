import React, { useState, useEffect } from "react";
import Script from "react-load-script";
import useWebplayer from "../../hooks/useWebplayer";
import theme from "../../theme";
import useInterval from "../../hooks/useInterval";
import VolumeSlider from "../VolumeSlider";

import {
  Container,
  Slider,
  Body,
  Left,
  Right,
  Spinner,
  ProgressBar
} from "./styles";
import useRoomTracks from "../../hooks/useRoomTracks";

import "../../global.css";

import MusicController from "../MusicController";

export default function SpotifyWebplayer({ token, room }) {
  const [scriptState, setScriptState] = useState({
    error: false
  });

  const [start, setStart] = useState(false);

  const [volume, setVolume] = useState(0);

  const { roomTracks } = useRoomTracks(room);

  const [seekPosition, setSeekPosition] = useState(0);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const duration =
    roomTracks && roomTracks.currentSong && roomTracks.currentSong.duration_ms;

  const { loadScript, deviceState, queTrack } = useWebplayer(
    token,
    room,
    start,
    duration
  );

  // Used for updating slider posiiton
  // TODO seperate into new component
  const [trackPosition, setTrackPosition] = useState(0);

  useEffect(() => {
    setTrackPosition(deviceState.lastSeek);
  }, [deviceState.lastSeek, deviceState.currentSong]);

  useInterval(
    () => setTrackPosition(trackPosition + 100),
    !deviceState.paused ? 100 : null
  );

  useEffect(() => {
    const position = (trackPosition / duration) * 300;
    setSeekPosition(position < 300 ? position : 0);
  }, [duration, trackPosition]);

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
          <Slider>
            <ProgressBar
              width={seekPosition ? seekPosition / 3 + "%" : 0}
            ></ProgressBar>
            <input
              type="range"
              min="0"
              max="300"
              className="slider"
              value={seekPosition}
              onChange={e => {
                if (duration) {
                  const seekDestinationMs = Math.round(
                    (parseInt(e.target.value) / 300) * duration
                  );
                  room.controller.seek(seekDestinationMs);
                }
              }}
            />
          </Slider>
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
