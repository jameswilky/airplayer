import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function useRoom() {
  const url = "http://localhost:8888";
  const socket = io.connect(url);

  const Controller = socket => {
    // This function is used to create a new controller to manage the room.
    // It has to recreated to inherit the socket closure after a room as been joined
    return {
      joinRoom: (id, password = null) =>
        socket.emit("JOIN_ROOM", { id, password }),
      addTrack: id => socket.emit("ADD_TRACK", { trackId: id })
    };
  };

  const [room, setRoom] = useState({
    state: {},
    controller: Controller(socket),
    error: ""
  });

  useEffect(() => {
    socket.on("ROOM_UPDATED", nextRoomState => {
      setRoom({
        ...room,
        state: nextRoomState,
        controller: Controller(socket)
      });
    });
    socket.on("ERROR", err => setRoom({ ...room, error: err }));
  });

  return room;
}
