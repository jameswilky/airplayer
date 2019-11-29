import { useEffect } from "react";

export default function useTogglePause(deviceState, player) {
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
}
