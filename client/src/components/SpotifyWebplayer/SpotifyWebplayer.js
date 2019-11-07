import React, { useState, useEffect } from "react";
import Script from "react-load-script";
import useWebplayer from "../../hooks/useWebplayer";
import theme from "../../theme";
import placeholder from "../../images/gameova.jpg";
import VolumeSlider from "../VolumeSlider";

import { Container, Slider, Body, Left, Right, Spinner } from "./styles";
import useRoomTracks from "../../hooks/useRoomTracks";

import "../../global.css";

import MusicController from "../MusicController";

export default function SpotifyWebplayer({ token, room }) {
  const [scriptState, setScriptState] = useState({
    error: false
  });

  const [start, setStart] = useState(false);
  const { loadScript, deviceState, queTrack } = useWebplayer(
    token,
    room,
    start
  );

  const [volume, setVolume] = useState(0);

  const { roomTracks } = useRoomTracks(room);

  const [seekPosition, setSeekPosition] = useState(0);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  console.log(roomTracks);

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
          <Slider progress={seekPosition}>
            <div type="progressBar"></div>
            <input
              type="range"
              min="0"
              max="100"
              className="slider"
              value={seekPosition}
              onChange={e => setSeekPosition(e.target.value)}
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
