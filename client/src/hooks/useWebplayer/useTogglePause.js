import React, { useEffect } from "react";

export default function useTogglePause(deviceState, player) {
  // Pause/Resume loaded Track
  useEffect(() => {
    if (deviceState.ready && deviceState.currentSong) {
      if (deviceState.paused) {
        player.pause().then(() => console.log("not playing"));
      } else {
        player.resume().then(() => console.log("playing"));
      }
    }
  }, [deviceState.ready, deviceState.currentSong, deviceState.paused]);
}
