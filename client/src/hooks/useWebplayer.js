import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  useRef
} from "react";
import useTimeout from "./useTimeout";
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
export default function useWebplayer(token, room, start, duration) {
  const [player, setPlayer] = useState();
  const [loadScript, setLoadScript] = useState(false);

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

  const skipAttempts = useRef(0);
  const [remaining, setRemaining] = useState(null);

  // 1 Second before track finishes, que the next track
  // Workaround for spotify sdk bug
  useTimeout(() => {
    skipAttempts.current += 1;
    setTrackFinished(true);
  }, remaining);

  //When a track ends, que the next track
  useEffect(() => {
    if (trackFinished == true && skipAttempts.current === 1) {
      queTrack(1);
      setTrackFinished(false);
    }
  });

  const queTrack = useCallback(
    pos => {
      const nextSongIndex = deviceState.playlist.indexOf(
        deviceState.currentSong
      );
      const nextSong = deviceState.playlist[nextSongIndex + pos];

      if (nextSong) {
        room.controller.play(nextSong);
        setTimeout(() => (skipAttempts.current = 0), 5000);
      }
    },
    [deviceState]
  );

  // Load the first track in the roomstate
  useEffect(() => {
    room.controller.play(room.state.playlist[0].trackId);
  }, []);

  // Play loaded track
  useEffect(() => {
    // start variable is used for toggling autoplay
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
        console.log("pausing");
        player.pause();
      } else {
        console.log("playing");
        player.resume();
      }
    }
  }, [deviceState.ready, deviceState.currentSong, deviceState.paused]);

  // When seek position changes update player accordingly
  useEffect(() => {
    if (
      deviceState.ready &&
      deviceState.currentSong &&
      duration &&
      deviceState.lastSeek
    ) {
      player.seek(deviceState.lastSeek);
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
    // Assign event to listen for script to load
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
    // Start loading script
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

  return { deviceState, loadScript, player, queTrack };
}
