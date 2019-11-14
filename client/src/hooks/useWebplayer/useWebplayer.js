import { useEffect, useState, useReducer } from "react";

import reducer from "./reducer";
import usePlay from "./usePlay";
import useQue from "./useQue";
import useSeek from "./useSeek";
import useSetup from "./useSetup";
import useTogglePause from "./useTogglePause";

// This webplayer will control the player by reading state from the room
export default function useWebplayer(token, room, start, duration) {
  const [deviceState, dispatch] = useReducer(reducer, {
    id: null,
    currentSong: null,
    paused: false,
    ready: false,
    playlist: [],
    lastSeek: 0
  });

  const [loadScript, setLoadScript] = useState(false);

  //When a track finishes, que the next track and play
  const { setRemaining, queTrack } = useQue(deviceState, room.controller);

  // connect player and set up events
  const { player } = useSetup(token, setLoadScript, setRemaining, dispatch);

  const [volume, setVolume] = useState(0);

  // When seek position changes update player to seek to that position
  useSeek(deviceState, duration, player);

  // Play loaded track
  usePlay(deviceState, start, room, token);

  // Pause/Resume loaded Track
  useTogglePause(deviceState, player);

  // if room state changes, reflect that state in the webplayer
  useEffect(() => {
    dispatch({ type: "UPDATE_PLAYER", payload: { roomState: room.state } });
  }, [room.state]);

  return { deviceState, loadScript, queTrack, volume, setVolume };
}
