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
        playlist: roomState.playlist.map(track => track.trackId),
        lastSeek: roomState.currentSong.lastSeek
      };
    }
    default:
      return state;
  }
};

// This webplayer will control the player by reading state from the room
export default function useWebplayer(
  token,
  room,
  start,
  setSeekPosition,
  duration
) {
  const [player, setPlayer] = useState();
  const [loadScript, setLoadScript] = useState(false);

  const [trackTimer, setTrackTimer] = useState({
    duration: duration,
    remaining: null
  });

  const [timerActive, setTimerActive] = useState(false);
  const [trackFinished, setTrackFinished] = useState(false);

  const [deviceState, dispatch] = useReducer(deviceReducer, {
    id: null,
    currentSong: null,
    paused: false,
    ready: false,
    playlist: [],
    lastSeek: 0
  });

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
    [deviceState.id, token]
  );

  // A few milliseconds before a track ends, pause it then skip to next track

  useEffect(() => {
    // Due to a bug in the Spotify WebSDK, tracks will always repeat
    // This prevents the next track playing for a few seconds before changing,
    // by deliberately pausing 1 second before and quing next track

    console.log((trackTimer.remaining - 10000) / 1000 / 60);
    const pauseTrackJustBeforeFinished = () =>
      trackTimer.duration &&
      trackTimer.remaining &&
      setTimeout(() => console.log("next Track"), trackTimer.remaining - 10000);

    if (timerActive) {
      clearTimeout(pauseTrackJustBeforeFinished);
      pauseTrackJustBeforeFinished();
    }

    return () => clearTimeout(pauseTrackJustBeforeFinished);
  }, [player, trackTimer, timerActive]);

  // Load the first track in the roomstate
  useEffect(() => {
    room.controller.play(room.state.playlist[0].trackId);
  }, []);

  // When a track ends, que the next track
  useEffect(() => {
    if (trackFinished == true) {
      player.pause().then(() => {
        queTrack(1);
        setTrackFinished(false);
      });
    }
  }, [trackFinished]);

  const queTrack = useCallback(
    pos => {
      const nextSongIndex = deviceState.playlist.indexOf(
        deviceState.currentSong
      );
      const nextSong = deviceState.playlist[nextSongIndex + pos];

      if (nextSong) {
        room.controller.play(nextSong);
      }
    },
    [deviceState]
  );

  // Play loaded track
  useEffect(() => {
    // start variable is used for toggling autoplay
    if (start) {
      if (deviceState.ready && deviceState.currentSong) {
        play(deviceState.currentSong).then(() => setTimerActive(true));
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
        player.resume();
      }
    }
  }, [deviceState.ready, deviceState.currentSong, deviceState.paused]);

  // When seek position changes update player accordingly
  // useEffect(() => {
  //   if (deviceState.ready && deviceState.currentSong && duration) {
  //     player.seek((parseInt(seekPosition) / 100) * duration)
  //   }
  // }, [deviceState.ready, deviceState.currentSong, seekPosition, duration]);
  useEffect(() => {
    if (
      deviceState.ready &&
      deviceState.currentSong &&
      duration &&
      deviceState.lastSeek
    ) {
      player.seek(deviceState.lastSeek);
      setSeekPosition((deviceState.lastSeek / duration) * 100);
    }
  }, [
    deviceState.ready,
    deviceState.currentSong,
    deviceState.lastSeek,
    duration
  ]);

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
      player.connect().then(success => {
        success ? setPlayer(player) : setPlayer({ error: "Failed to connect" });
      });
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

  useEffect(() => {
    if (player) {
      let timeStamp = Date.now();
      const handleStateChange = state => {
        // Hacky way to make sure the event doesnt trigger end of track
        // too many times, event is triggering multiple times for some reason
        if (timeStamp > 0) {
          setTrackTimer({
            duration: state.duration,
            remaining: state.duration - state.position
          });
        }

        timeStamp -= state.timestamp;
        setTimeout(() => {
          timeStamp = Date.now();
        }, 1000);
      };

      player.addListener("player_state_changed", handleStateChange);

      return () =>
        player.removeListener("player_state_changed", handleStateChange);
    }
  }, [player, trackTimer]);

  return { deviceState, loadScript, player, queTrack };
}
