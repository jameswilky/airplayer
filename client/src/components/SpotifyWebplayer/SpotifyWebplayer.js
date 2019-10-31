import React, { useState, useEffect } from "react";
import Script from "react-load-script";
import styled from "styled-components";
import useWebplayer from "../../hooks/useWebplayer";

// This component should send commands to the server to update the room state,
// it should not directly control the player
export default function SpotifyWebplayer({ token, room }) {
  const [scriptState, setScriptState] = useState({
    error: false
  });

  const { loadScript, player, deviceState } = useWebplayer(token, room);

  // const playerReady = deviceId !== null;
  const AudioPlayer = styled.div``;
  const Spinner = styled.div``;

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
          <button
            onClick={() => {
              player.getCurrentState().then(state => {
                if (state) {
                  player.seek(state.duration - 10000);
                }
              });
            }}
          >
            skipToend
          </button>
        </AudioPlayer>
      ) : (
        <Spinner>Loading</Spinner>
      )}
    </>
  );
}
