import React, { useState, useEffect, useCallback } from "react";
import Spotify from "../modules/Spotify";
import { useSelector } from "react-redux";
import { ItemPrototype } from "../modules/SpotifyHelper/SpotifyHelper";

export default function useRoomTracks(room) {
  // Store Access
  const accessToken = useSelector(state => state.auth.accessToken);
  // Local State

  // Local Variables
  const [roomTracks, setRoomTracks] = useState({
    currentSong: null,
    playlist: null
  });
  const spotify = Spotify(accessToken);

  useEffect(() => {
    if (room.state.currentSong && room.state.playlist) {
      const currentSongPromise = spotify.find({
        track: { where: { id: room.state.currentSong.trackId.split(":")[2] } }
      });
      const playlistPromise = Promise.all(
        room.state.playlist.map(track =>
          spotify.find({
            track: { where: { id: track.trackId.split(":")[2] } }
          })
        )
      );
      Promise.all([currentSongPromise, playlistPromise]).then(
        ([currentSong, playlist]) => {
          Reflect.setPrototypeOf(currentSong, ItemPrototype());

          playlist.map(track => Reflect.setPrototypeOf(track, ItemPrototype()));
          setRoomTracks({
            currentSong,
            playlist
          });
        }
      );
    }
  }, [room.state]);

  return { roomTracks };
}