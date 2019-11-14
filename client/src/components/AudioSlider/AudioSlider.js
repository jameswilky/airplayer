import React, { useState, useEffect } from "react";
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
  const [seekPosition, setSeekPosition] = useState(0);
  const [trackPosition, setTrackPosition] = useState(0);

  useEffect(() => {
    setTrackPosition(lastSeek);
  }, [lastSeek, currentSong]);

  useInterval(
    () => setTrackPosition(trackPosition + 100),
    playing ? 100 : null
  );

  useEffect(() => {
    const position = (trackPosition / duration) * 300;
    setSeekPosition(position < 300 ? position : 0);
  }, [duration, trackPosition]);

  return (
    <Slider>
      <ProgressBar
        width={seekPosition ? seekPosition / 3 + "%" : 0}
      ></ProgressBar>
      <input
        type="range"
        min="0"
        max="300"
        className="slider"
        value={seekPosition}
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
