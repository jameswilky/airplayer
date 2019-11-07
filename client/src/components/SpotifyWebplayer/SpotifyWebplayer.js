import React, { useState, useEffect } from "react";
import Script from "react-load-script";
import styled from "styled-components";
import useWebplayer from "../../hooks/useWebplayer";
import Loader from "react-loader-spinner";
import theme from "../../theme";
import placeholder from "../../images/gameova.jpg";
import VolumeSlider from "../VolumeSlider";

import "../../global.css";

import {
  IoIosSkipBackward,
  IoIosPlay,
  IoIosSkipForward,
  IoIosPause
} from "react-icons/io";

const AudioPlayer = styled.div`
  background-color: transparent;
  height: 100%;
  color: ${props => props.theme.black};
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
`;

const Body = styled.div`
  background-color: ${props => props.theme.transparent5};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Left = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;

  & > img {
    width: 80px;
  }

  & > div {
    padding-left: 15px;
    font-size: 0.8rem;

    & > h5 {
      color: ${props => props.theme.darkestGray};
    }

    & > p {
      color: ${props => props.theme.gray};
    }
  }
`;

const Centre = styled.div`
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
const Right = styled.div`
  color: ${props => props.theme.primary};
  font-size: 2rem;
  margin-right: 3rem;

  position: relative;
  display: grid;
  justify-items: flex-end;
`;

const Spinner = styled(Loader)`
  padding-top: 5px;
  text-align: center;
  background-color: ${props => props.theme.white};
`;

const Slider = styled.div`
  background: ${props => props.theme.lighterGray};
  position: absolute;
  bottom: 80px;
  width: 100%;
  height: 15px;

  & > div[type="progressBar"] {
    position: absolute;
    width: ${props => props.progress + "%"};
    height: 15px;
    background: ${props => props.theme.gradient};
  }

  & > input {
    position: relative;
    width: 100%;
    height: 15px;
    z-index: 99;
    cursor: pointer;
  }
`;

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

  const volume = 70;

  const [seekPosition, setSeekPosition] = useState(0);

  const isFirstTrack =
    room.state.playlist
      .map(track => track.trackId)
      .indexOf(room.state.currentSong.trackId) === 0;

  const isLastTrack =
    room.state.playlist
      .map(track => track.trackId)
      .indexOf(room.state.currentSong.trackId) ===
    room.state.playlist.length - 1;

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
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
        <AudioPlayer>
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
              <img src={placeholder} alt="" />
              <div>
                <h3>Game Ova</h3>
                <p>Tobi Lou, Album Name</p>
              </div>
            </Left>
            <Centre>
              {isFirstTrack ? (
                <div></div>
              ) : (
                <IoIosSkipBackward
                  onClick={() => queTrack(-1)}
                ></IoIosSkipBackward>
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
                <IoIosSkipForward
                  onClick={() => queTrack(1)}
                ></IoIosSkipForward>
              )}
            </Centre>
            <Right>
              <VolumeSlider
                show={showVolumeSlider}
                setShow={setShowVolumeSlider}
                volume={volume}
              ></VolumeSlider>
            </Right>
          </Body>
        </AudioPlayer>
      ) : (
        <Spinner type="Bars" color={theme.primary} height={70} width={50} />
      )}
    </>
  );
}
