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
  // TODO create new hook that takes in previous state as an argument
  useInterval(
    () => {
      // Necassary due to stale closure

      // If we have seeked, we move 100ms from last seek
      // if we havent seeked we move 100ms from last trackposition
      setTrackPosition(lastSeek =>
        lastSeek !== prevSeek ? trackPosition + 100 : prevSeek + 100
      );
    },
    playing ? 100 : null
  );

  useEffect(() => {}, [lastSeek]);

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
