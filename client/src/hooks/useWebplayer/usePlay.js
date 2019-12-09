import { useEffect, useCallback } from "react";

export default function usePlay(deviceState, start, room, token) {
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

  // Load the first track in the roomstate
  useEffect(() => {
    if (room.state.playlist.length > 0) {
      room.controller.play(room.state.playlist[0].uri);
    }
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
}
