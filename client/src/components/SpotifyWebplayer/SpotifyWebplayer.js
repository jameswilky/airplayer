import React, { useState, useEffect } from "react";
import Script from "react-load-script";
import styled from "styled-components";
import useWebplayer from "../../hooks/useWebplayer";
import Loader from "react-loader-spinner";
import theme from "../../theme";

const AudioPlayer = styled.div`
  background-color: ${props => props.theme.white};
  height: 100%;
  color: ${props => props.theme.black};
  display: grid;
  width: 100%;
  grid-template-rows: 10px 1fr;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  & div {
    border: 2px solid black;
  }
`;
const Spinner = styled(Loader)`
  padding-top: 5px;
  text-align: center;
  background-color: ${props => props.theme.white};
`;

const Slider = styled.div``;

export default function SpotifyWebplayer({ token, room }) {
  const [scriptState, setScriptState] = useState({
    error: false
  });

  const { loadScript, player, deviceState } = useWebplayer(token, room);

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

      {true ? (
        <AudioPlayer>
          <Slider></Slider>
          <Body>
            <div></div>
            <div></div>
            <div></div>
          </Body>
        </AudioPlayer>
      ) : (
        <Spinner type="Bars" color={theme.primary} height={70} width={50} />
      )}
    </>
  );
}
