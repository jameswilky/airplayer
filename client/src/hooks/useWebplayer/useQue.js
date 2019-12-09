import { useCallback, useState, useRef, useEffect } from "react";
import useTimeout from "../useTimeout";

export default function useQue(deviceState, controller) {
  const skipAttempts = useRef(0);
  const [trackFinished, setTrackFinished] = useState(false);
  const [remaining, setRemaining] = useState(null);

  const queTrack = useCallback(
    pos => {
      const nextSongIndex = deviceState.playlist.indexOf(
        deviceState.currentSong
      );
      const nextSong = deviceState.playlist[nextSongIndex + pos];

      if (nextSong) {
        controller.play(nextSong);
        setTimeout(() => (skipAttempts.current = 0), 5000);
      }
    },
    [deviceState]
  );

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

  return { setRemaining, queTrack };
}
