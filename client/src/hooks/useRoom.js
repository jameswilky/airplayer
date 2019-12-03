import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function useRoom() {
  const url = "http://localhost:8888";
  const socket = io.connect(url);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState({ type: "", payload: "" });

  const Controller = socket => {
    // This function is used to create a new controller to manage the room.
    // It has to recreated to inherit the socket closure after a room as been joined
    return {
      createRoom: (name, password = null) =>
        socket.emit("CREATE_ROOM", { name, userId: "123" }),
      joinRoom: (id, password = null) =>
        socket.emit("JOIN_ROOM", { id, password }),
      addTrack: id => socket.emit("ADD_TRACK", { uri: id }),
      removeTrack: id => socket.emit("REMOVE_TRACK", { uri: id }),
      updatePlaylist: playlist => socket.emit("UPDATE_PLAYLIST", playlist),
      play: id => socket.emit("PLAY", { uri: id }),
      pause: () => socket.emit("PAUSE", null),
      resume: () => socket.emit("RESUME", null),
      seek: destination => socket.emit("SEEK", destination)
    };
  };

  const [room, setRoom] = useState({
    state: {},
    controller: Controller(socket),
    error: ""
  });

  useEffect(() => {
    socket.on("ROOM_CREATED", payload =>
      setSuccess({ type: "ROOM_CREATED", payload, message: "Room Created" })
    );
    socket.on("ROOM_UPDATED", nextRoomState => {
      setRoom({
        ...room,
        state: nextRoomState,
        controller: Controller(socket)
      });
    });
    socket.on("ERROR", ({ type, payload, message, code }) =>
      setError({ type, payload, message, code })
    );
    socket.on("SUCCESS", ({ type, payload, message }) =>
      setSuccess({ type, payload, message })
    );
  }, [room]);

  return { room, roomError: error, roomSuccess: success };
}
