import React, { useState, useEffect, useCallback } from "react";
import Spotify from "../modules/Spotify";
import { ItemPrototype } from "../modules/SpotifyHelper/SpotifyHelper";

export default function useRoomTracks(auth, room) {
  // Store Access
  // Local State

  // Local Variables
  const [roomTracks, setRoomTracks] = useState({
    currentSong: null,
    playlist: null,
    filtered: null,
    generated: null
  });
  const spotify = Spotify(auth.accessToken);

  useEffect(() => {
    if (
      room &&
      room.state &&
      room.state.currentSong &&
      room.state.playlist &&
      room.state.recommendations &&
      room.state.recommendations.playlist
    ) {
      const currentSongPromise = spotify.find({
        track: { where: { id: room.state.currentSong.uri.split(":")[2] } }
      });
      const playlistPromise = Promise.all(
        room.state.playlist.map(track =>
          spotify.find({
            track: { where: { id: track.uri.split(":")[2] } }
          })
        )
      );
      // Tracks that are filtered from toptracks
      const filteredPromise = Promise.all(
        room.state.recommendations.playlist.selected.map(track =>
          spotify.find({
            track: { where: { id: track.uri.split(":")[2] } }
          })
        )
      );

      // Tracks recommended by spotify
      const generatedPromise = Promise.all(
        room.state.recommendations.playlist.generated.map(track =>
          spotify.find({
            track: { where: { id: track.uri.split(":")[2] } }
          })
        )
      );
      Promise.all([
        currentSongPromise,
        playlistPromise,
        filteredPromise,
        generatedPromise
      ]).then(([currentSong, playlist, filtered, generated]) => {
        Reflect.setPrototypeOf(currentSong, ItemPrototype());

        playlist.map(track => Reflect.setPrototypeOf(track, ItemPrototype()));

        filtered.map(track => Reflect.setPrototypeOf(track, ItemPrototype()));
        generated.map(track => Reflect.setPrototypeOf(track, ItemPrototype()));

        setRoomTracks({
          currentSong,
          playlist,
          filtered,
          generated
        });
      });
    }
  }, [room.state]);

  return { roomTracks };
}
