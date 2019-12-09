import { useEffect } from "react";

export default function useSeek(deviceState, duration, player) {
  useEffect(() => {
    if (
      deviceState.ready &&
      deviceState.currentSong &&
      duration &&
      deviceState.lastSeek &&
      player
    ) {
      player.seek(deviceState.lastSeek);
    }
  }, [
    deviceState.ready,
    deviceState.currentSong,
    deviceState.lastSeek,
    duration
  ]);
}
