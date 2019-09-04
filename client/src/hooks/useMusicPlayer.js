import React, { useState, useEffect } from "react";
import SpotifyAPI from "../modules/Spotify";
import { useSelector, useDispatch } from "react-redux";

export default function useMusicPlayer() {
  const { accessToken, isAuthenticated } = useSelector(state => state.auth);
  const spotify = SpotifyAPI(accessToken);

  return {};
}
