import React, { useEffect, useState, useReducer, useCallback } from "react";

const deviceReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRACK_FINISHED":
      return { ...state, trackFinished: action.payload };
    case "SET_DEVICE":
      return {
        ...state,
        id: action.payload.device_id,
        ready: action.payload.ready
      };

    case "UPDATE_PLAYER": {
      const roomState = action.payload.roomState;
      return {
        ...state,
        currentSong: roomState.currentSong.trackId,
        paused: !roomState.currentSong.playing
      };
    }
    default:
      return state;
  }
};
// This webplayer will control the player by reading state from the room
export default function useWebplayer(token, room) {
  const [player, setPlayer] = useState();
  const [loadScript, setLoadScript] = useState(false);

  const [deviceState, dispatch] = useReducer(deviceReducer, {
    id: null,
    currentSong: null,
    paused: false,
    trackFinished: false,
    ready: false
  });

  const autoplay = true;

  const play = useCallback(
    async track =>
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceState.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            uris: [track]
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      ),
    [deviceState, token]
  );

  // Load the first track in the roomstate
  useEffect(() => {
    room.controller.play(room.state.playlist[0].trackId);
  }, []);

  // play the currently loaded track
  useEffect(() => {
    if (deviceState.ready && deviceState.currentSong) {
      play(deviceState.currentSong);
    }
  }, [deviceState.ready, deviceState.currentSong]);

  // if room state changes, reflect that state in the webplayer
  useEffect(() => {
    dispatch({ type: "UPDATE_PLAYER", payload: { roomState: room.state } });
  }, [room.state]);

  // Set up webplayer
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: cb => {
          cb(token);
        }
      });
      player
        .connect()
        .then(success =>
          success
            ? setPlayer(player)
            : setPlayer({ error: "Failed to connect" })
        );
    };
    setLoadScript(true);
  }, [player, window.Spotify]);

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

      // Playback status updates
      player.addListener("player_state_changed", state => {
        if (state.paused == true && state.position == 0) {
          console.log(state);
          const nextSongIndex =
            room.state.playlist.findIndex(
              track => track.trackId === room.state.currentSong.trackId
            ) + 1;

          const nextSong = room.state.playlist[nextSongIndex];
          console.log(nextSong);

          if (nextSong) {
            room.controller.play(nextSong.trackId);
          }
        }
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

  return { deviceState, loadScript, player };
}
