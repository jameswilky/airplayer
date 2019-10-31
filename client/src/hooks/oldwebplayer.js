import React, { useEffect, useState } from "react";

// This webplayer will control the player by reading state from the room
export default function useWebplayer(token, room) {
  const [deviceId, setDeviceId] = useState(null);
  const [trackFinished, setTrackFinished] = useState(false);
  const [player, setPlayer] = useState();
  const [paused, setPaused] = useState(true);

  // Refactor this to use a reducer instead

  console.log(room.state);
  useEffect(() => {
    if (deviceId && !paused && player) {
      if (room.state.currentSong.playing) {
        play(room.state.currentSong.trackId);
      } else if (!room.state.currentSong.playing) {
        player.pause().then(() => room.controller.pause());
      }
    }
  }, [deviceId, token, room, paused, player]);

  useEffect(() => {
    if (trackFinished) {
      const nextSongIndex =
        room.state.playlist.findIndex(
          track => track.trackId === room.state.currentSong.trackId
        ) + 1;

      const nextSong = room.state.playlist[nextSongIndex];
      if (nextSong) {
        room.controller.play(nextSong.trackId);
        setTrackFinished(false);
      }
    }
  }, [room, trackFinished]);

  // useEffect(() => {
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     const player = new window.Spotify.Player({
  //       name: "Web Playback SDK Quick Start Player",
  //       getOAuthToken: cb => {
  //         cb(token);
  //       }
  //     });

  //     setPlayer(player);

  //     // Error handling
  //     player.addListener("initialization_error", ({ message }) => {
  //       console.error(message);
  //     });
  //     player.addListener("authentication_error", ({ message }) => {
  //       console.error(message);
  //     });
  //     player.addListener("account_error", ({ message }) => {
  //       console.error(message);
  //     });
  //     player.addListener("playback_error", ({ message }) => {
  //       console.error(message);
  //     });
  //     // Playback status updates
  //     player.addListener("player_state_changed", state => {
  //       if (state.paused == true && state.position == 0) {
  //         setTrackFinished(true);
  //       }
  //       console.log(state);
  //     });

  //     // Ready
  //     player.addListener("ready", ({ device_id }) => {
  //       setDeviceId(device_id);
  //       console.log("Ready with Device ID", device_id);
  //     });

  //     // Not Ready
  //     player.addListener("not_ready", ({ device_id }) => {
  //       console.log("Device ID has gone offline", device_id);
  //     });

  //     // Connect to the player!
  //     player.connect();
  //   };
  // }, [player]);

  return {
    deviceId,
    player,
    paused,
    setPaused
  };
}
