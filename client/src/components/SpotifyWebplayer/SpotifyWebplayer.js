import React, { useState } from "react";
import useWebplayer from "../../hooks/useWebplayer";
import Script from "react-load-script";
import styled from "styled-components";

export default function SpotifyWebplayer({ token }) {
  const { player } = useWebplayer(token);
  const [scriptState, setScriptState] = useState({
    loaded: false,
    error: false
  });

  const AudioPlayer = styled.div``;
  const Spinner = styled.div``;
  return (
    <>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onError={() => setScriptState({ ...scriptState, error: true })}
        onLoad={() => setScriptState({ ...scriptState, loaded: true })}
      ></Script>
      {scriptState.loaded ? (
        <AudioPlayer>loaded</AudioPlayer>
      ) : (
        <Spinner>Loading</Spinner>
      )}
    </>
  );
}
