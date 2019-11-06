import React, { useEffect, useState, useReducer, useCallback } from "react";

const deviceReducer = (state, action) => {
  switch (action.type) {
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
        paused: !roomState.currentSong.playing,
        playlist: roomState.playlist.map(track => track.trackId)
      };
    }
    default:
      return state;
  }
};

// This webplayer will control the player by reading state from the room
export default function useWebplayer(token, room, start) {
  const [player, setPlayer] = useState();
  const [loadScript, setLoadScript] = useState(false);

  const [trackFinished, setTrackFinished] = useState(false);

  const [deviceState, dispatch] = useReducer(deviceReducer, {
    id: null,
    currentSong: null,
    paused: false,
    ready: false,
    playlist: []
  });

  // When a track ends, que the next track
  useEffect(() => {
    if (trackFinished == true) {
      if (queNextTrack()) {
        setTrackFinished(false);
      }
    }
  }, [trackFinished]);

  const queNextTrack = useCallback(() => {
    const nextSongIndex = deviceState.playlist.indexOf(deviceState.currentSong);
    const nextSong = deviceState.playlist[nextSongIndex + 1];

    if (nextSong) {
      room.controller.play(nextSong);
      return true;
    } else return false;
  }, [deviceState]);

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

  // start loaded track
  useEffect(() => {
    if (start) {
      if (deviceState.ready && deviceState.currentSong) {
        play(deviceState.currentSong);
      }
    } else {
      room.controller.pause();
    }
  }, [deviceState.ready, deviceState.currentSong, start]);

  // Pause/Resume loaded Track
  useEffect(() => {
    if (deviceState.ready && deviceState.currentSong) {
      if (deviceState.paused) {
        player.pause();
      } else {
        player.resume().then(x => console.log(x));
      }
    }
  }, [deviceState.ready, deviceState.currentSong, deviceState.paused]);

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
      let timeStamp = Date.now();

      player.addListener("player_state_changed", state => {
        if (state.paused == true && state.position == 0) {
          // Hacky way to make sure the event doesnt trigger end of track
          // too many times, event is triggering multiple times for some reason
          if (timeStamp > 0) {
            setTrackFinished(true);
          }

          timeStamp -= state.timestamp;
          setTimeout(() => {
            timeStamp = Date.now();
          }, 1000);
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
