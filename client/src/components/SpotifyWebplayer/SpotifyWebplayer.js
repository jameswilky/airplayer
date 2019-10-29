import React, { useState, useEffect } from "react";
import useWebplayer from "../../hooks/useWebplayer";
import Script from "react-load-script";
import styled from "styled-components";

export default function SpotifyWebplayer({ token, tracks }) {
  const { player, deviceId, playlist, changeTrack } = useWebplayer(
    token,
    tracks
  );
  const [scriptState, setScriptState] = useState({
    error: false
  });

  const play = track =>
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({
        uris: [track]
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

  useEffect(() => {
    if (deviceId) {
      play(playlist[1]);
    }
  }, [changeTrack]);

  const playerReady = deviceId !== null;
  const AudioPlayer = styled.div``;
  const Spinner = styled.div``;

  return (
    <>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onError={() => setScriptState({ ...scriptState, error: true })}
        onLoad={() => setScriptState({ ...scriptState, loaded: true })}
      ></Script>
      {scriptState.loaded && playerReady && playlist ? (
        <AudioPlayer>
          loaded
          <button onClick={() => play(playlist[0])}>Play</button> {/*Temp*/}
          <button onClick={() => player.resume()}>resume</button>
          <button onClick={() => player.pause()}>Pause</button>
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
