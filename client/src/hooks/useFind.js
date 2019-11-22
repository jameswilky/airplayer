import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";
import useAuth from "./useAuth";
import { AlbumItemPrototype } from "../modules/SpotifyHelper/SpotifyHelper";

export default function useFind() {
  const { accessToken } = useAuth();

  const [queryString, setQueryString] = useState("");
  const [foundTracks, setFoundTracks] = useState(null);

  const spotify = Spotify(accessToken);

  useEffect(() => {
    const getTracks = async (type, uri) => {
      switch (type) {
        case "album": {
          const collection = await spotify.find({
            tracks: {
              where: { albums: { id: uri } }
            }
          });
          collection.items.forEach(item =>
            Reflect.setPrototypeOf(item, AlbumItemPrototype())
          );

          console.log(collection.items);

          return collection.items;
        }

        case "artist":
          return spotify.find({
            topTracks: {
              where: { artist: { id: uri } },
              market: "US"
            }
          });
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
  return [foundTracks, setQueryString];
}
