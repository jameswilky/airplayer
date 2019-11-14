import { useState } from "react";
import useDebounce from "../useDebounce";

export default function useVolume(player) {
  const [volume, setVolume] = useState(80);

  useDebounce(
    () => {
      if (player)
        player
          .setVolume(volume / 100)
          .then(() => console.log("changed volume"));
    },
    200,
    [volume]
  );

  return { volume, setVolume };
}
