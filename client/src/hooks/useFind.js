import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";
import useAuth from "./useAuth";
import { ItemPrototype } from "../modules/SpotifyHelper/SpotifyHelper";

export default function useFind() {
  const { accessToken } = useAuth();

  const [queryString, setQueryString] = useState("");
  const [foundTracks, setFoundTracks] = useState(null);

  const spotify = Spotify(accessToken);

  useEffect(() => {
    const getTracks = async (type, uri) => {
      switch (type) {
        case "album":
          return getAlbumTracks(uri);

        case "artist":
          return getArtistTracks(uri);

        case "playlist":
          return getPlaylistTracks(uri);
        default:
          return null;
      }
    };

    if (queryString !== "") {
      // e.g spotify:albums:123abc => [albums, 123abc]
      const [type, uri] = queryString.split(":").slice(-2);
      getTracks(type, uri).then(tracks => {
        setFoundTracks(tracks);
      });
    } else {
      setFoundTracks(null);
    }
  }, [queryString]);

  const getArtistTracks = async uri => {
    const collection = await spotify.find({
      topTracks: {
        where: { artist: { id: uri } },
        market: "AU"
      }
    });
    collection.tracks.forEach(item => {
      Reflect.setPrototypeOf(item, ItemPrototype());
    });
    return collection.tracks;
  };

  const getPlaylistTracks = async uri => {
    const collection = await spotify.find({
      tracks: { where: { playlist: { id: uri } } }
    });

    const tracks = collection.items.map(item => item.track);
    tracks.forEach(track => {
      Reflect.setPrototypeOf(track, ItemPrototype());
    });

    return tracks;
  };
  const getAlbumTracks = async uri => {
    const [collection, album] = await Promise.all([
      spotify.find({
        tracks: {
          where: { albums: { id: uri } }
        }
      }),
      spotify.find({
        album: { where: { id: uri } }
      })
    ]);

    collection.items.forEach(item => {
      item.images = album.images;
      Reflect.setPrototypeOf(item, ItemPrototype());
    });
    return collection.items;
  };
  return [foundTracks, setQueryString];
}
