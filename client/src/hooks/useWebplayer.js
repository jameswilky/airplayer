import React, { useEffect, useState } from "react";
import SpotifyWebplayer from "../modules/SpotifyWebplayer/SpotifyWebplayer";

export default function useWebplayer(token, tracks) {
  const [deviceId, setDeviceId] = useState(null);
  const [player, setPlayer] = useState();
  const [playlist, setPlaylist] = useState([]);
  const [changeTrack, setChangeTrack] = useState(false);

  useEffect(() => {
    setPlaylist(tracks);
  }, [tracks]);
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: cb => {
          cb(token);
        }
      });

      setPlayer(player);

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });
      // Playback status updates
      player.addListener("player_state_changed", state => {
        if (state.paused == true && state.position == 0) {
          setChangeTrack(changeTrack ? false : true);
          console.log("finished?");
        }
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }, []);

  return { player, deviceId, playlist, changeTrack };
}
