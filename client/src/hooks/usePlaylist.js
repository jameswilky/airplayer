import React, { useEffect, useState } from "react";

export default function usePlaylist(room) {
  const [playlist, setPlaylist] = useState({
    tracks: null,
    update: false,
    offset: 0
  });

  useEffect(() => {
    if (playlist.tracks == null) {
      if (room && room.state && room.state.playlist) {
        setPlaylist({
          ...playlist,
          tracks: room.state.playlist.map(track => track.trackId).slice(0, 3)
        });
      }
    } else {
      if (playlist.update) {
        setPlaylist({
          ...playlist,
          tracks: room.state.playlist
            .map(track => track.trackId)
            .slice(playlist.offset, playlist.offset + 3),
          update: false,
          offset:
            room.state.playlist.length == playlist.tracks.length
              ? 0
              : playlist.offset + 1
        });
      }
    }
  });
  return [playlist, setPlaylist];
}
