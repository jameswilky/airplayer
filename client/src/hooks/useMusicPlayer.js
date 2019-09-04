import React, { useState, useEffect } from "react";
import SpotifyAPI from "../modules/Spotify";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

export default function useMusicPlayer() {
  const { accessToken, isAuthenticated } = useSelector(state => state.auth);
  const spotify = SpotifyAPI(accessToken);

  const url = "http://localhost:8888";

  const socket = io(url);

  socket.on("connect", () => {
    socket.emit("JOIN_ROOM", {
      id: "5d47d90a191f0f30a0d73414"
    });

    socket.on("ROOM_UPDATED", nextRoomState => {
      console.log(nextRoomState);
    });

    socket.on("ERROR", msg => console.log(msg));
  });

  return {};
}
