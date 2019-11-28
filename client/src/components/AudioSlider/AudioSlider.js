import React, { useState, useEffect, useCallback } from "react";
import { ProgressBar, Slider } from "./styles";
import "../../global.css";

import useInterval from "../../hooks/useInterval";

export default function AudioSlider({
  playing,
  currentSong,
  lastSeek,
  duration,
  seek
}) {
  const [trackPosition, setTrackPosition] = useState();

  const prevSeek = lastSeek;
  useInterval(
    () => {
      if (prevSeek !== lastSeek) setTrackPosition(trackPosition + 100);
    },
    playing ? 100 : null
  );

  useEffect(() => {
    setTrackPosition(lastSeek);
  }, [lastSeek, currentSong]);

  return (
    <Slider>
      <ProgressBar
        width={
          trackPosition && duration ? (trackPosition / duration) * 100 + "%" : 0
        }
      ></ProgressBar>
      <input
        type="range"
        min="0"
        max="300"
        className="slider"
        value={trackPosition && duration ? (trackPosition / duration) * 300 : 0}
        onChange={e => {
          if (duration) {
            const seekDestinationMs = Math.round(
              (parseInt(e.target.value) / 300) * duration
            );
            seek(seekDestinationMs);
          }
        }}
      />
    </Slider>
  );
}
