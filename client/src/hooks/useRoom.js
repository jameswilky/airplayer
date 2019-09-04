import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

export default function useRoom() {
  const url = "http://localhost:8888";
  const socket = io.connect(url);

  const inARoom = useSelector(state => state.inARoom);
  const dispatch = useDispatch();

  const Controller = socket => {
    // This function is used to create a new controller to manage the room.
    // It has to recreated to inherit the socket closure after a room as been joined
    return {
      joinRoom: (id, password = null) => {
        socket.emit("JOIN_ROOM", { id, password });
        dispatch({ type: "SET_IN_A_ROOM", payload: true });
      },
      addTrack: id => socket.emit("ADD_TRACK", { trackId: id }),
      removeTrack: id => socket.emit("REMOVE_TRACK", { trackId: id }),
      updatePlaylist: playlist => socket.emit("UPDATE_PLAYLIST", playlist),
      play: id => socket.emit("PLAY", { trackId: id }),
      pause: () => socket.emit("PAUSE", null)
    };
  };

  const [room, setRoom] = useState({
    state: {},
    controller: Controller(socket),
    error: "",
    inARoom: false
  });

  useEffect(() => {
    socket.on("ROOM_UPDATED", nextRoomState => {
      setRoom({
        ...room,
        state: nextRoomState,
        controller: Controller(socket),
        inARoom: true
      });
    });
    socket.on("ERROR", err => setRoom({ ...room, error: err }));
  });

  return room;
}
