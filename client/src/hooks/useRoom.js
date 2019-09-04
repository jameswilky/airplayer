import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function useRoom() {
  const url = "http://localhost:8888";

  const [roomState, setRoomState] = useState({
    id: "5d47d90a191f0f30a0d73414"
  });
  const [roomControllers, setRoomControllers] = useState({});

  const [error, setError] = useState("");

  let socket = io.connect(url);
  let addTrack;

  useEffect(() => {
    socket.emit("JOIN_ROOM", {
      id: roomState.id
    });
  }, [roomState.id]);

  useEffect(() => {
    socket.on("ROOM_UPDATED", nextRoomState => {
      setRoomState(nextRoomState);
      setRoomControllers({
        addTrack: id => socket.emit("ADD_TRACK", { trackId: id })
      });
    });
    socket.on("ERROR", err => setError(err));
  });

  return { roomState, roomControllers, error };
}
