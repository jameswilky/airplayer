import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";
import { ItemPrototype } from "../modules/SpotifyHelper/SpotifyHelper";

export default function useFind(auth) {
  const [findQuery, setFindQuery] = useState({ uri: "", name: "" });
  const [findResult, setFindResult] = useState({ tracks: [], name: "" });

  const spotify = Spotify(auth.accessToken);

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

    if (findQuery.uri !== "") {
      // e.g spotify:albums:123abc => [albums, 123abc]
      const [type, uri] = findQuery.uri.split(":").slice(-2);
      getTracks(type, uri).then(tracks => {
        setFindResult({ tracks: tracks, name: findQuery.name });
      });
    } else {
      setFindResult({ tracks: null, name: null });
    }
  }, [findQuery]);

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
  return [findResult, setFindQuery];
}
