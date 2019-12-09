import { useState, useEffect } from "react";

export default function useSetup(token, setLoadScript, setRemaining, dispatch) {
  const [player, setPlayer] = useState();
  // Set up webplayer
  useEffect(() => {
    // Assign event to listen for script to load
    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: cb => {
            cb(token);
          }
        });
        player.connect().then(success => {
          success
            ? setPlayer(player)
            : setPlayer({ error: "Failed to connect" });
        });
      };
      // Start loading script
      setLoadScript(true);
    }
  }, [player, window.Spotify]);

  useEffect(() => {
    if (!player) {
    }
  }, [player]);

  //Player Events
  useEffect(() => {
    if (player) {
      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        dispatch({ type: "SET_DEVICE", payload: { device_id, ready: true } });
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        dispatch({
          type: "SET_DEVICE",
          payload: { device_id, ready: false }
        });
        console.log("Device ID has gone offline", device_id);
      });
    }
  }, [player]);

  // When device state updates, get current position of track
  useEffect(() => {
    if (player) {
      const handleStateChange = state => {
        setRemaining(state.duration - state.position - 1000);
      };
      player.addListener("player_state_changed", handleStateChange);
      return () =>
        player.removeListener("player_state_changed", handleStateChange);
    }
  }, [player]);
  return { player };
}
