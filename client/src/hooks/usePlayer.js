import { useState, useEffect } from "react";
import useRoom from "./useRoom";

export default function usePlayer() {
  const room = useRoom();
  const [playlist, setPlaylist] = useState();
  return null;
}
