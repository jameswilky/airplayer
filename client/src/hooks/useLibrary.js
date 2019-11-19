import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";
import useAuth from "./useAuth";
import { getKey, getNestedProperty } from "../helpers/ObjectUtils";
import { ItemPrototype } from "../modules/SpotifyHelper/SpotifyHelper";

export default function useLibrary() {
  // Store Access
  const { accessToken } = useAuth();
  // Local State
  const [query, setQuery] = useState("tobi");
  const [queryResults, setQueryResults] = useState({
    tracks: {},
    artists: {},
    playlists: {},
    albums: {}
  });

  // Local Variables
  const spotify = Spotify(accessToken);

  // Search Handler
  useEffect(() => {
    const getQueries = async query => {
      const queries = Object.keys(queryResults).map(type => {
        switch (type) {
          case "tracks":
            return spotify
              .user()
              .library()
              .get(type);
          case "albums":
            return spotify
              .user()
              .library()
              .get(type);
          case "artists":
            return spotify.user().artists();
          case "playlists":
            return spotify.user().playlists();
        }
      });

      const results = await Promise.all(queries);

      const tracks = results[0].items
        .map(item => item.track)
        .filter(
          track =>
            track.name.includes(query) ||
            track.artists.filter(artist => artist.name.includes(query))
        );
      const artists = results[1].artists.items.filter(artist =>
        artist.name.includes(query)
      );
      const playlists = results[2].items.filter(playlist =>
        playlist.name.includes(query)
      );
      const albums = results[3].items
        .map(item => item.album)
        .filter(album => album.name.includes(query));

      const nextQueryResults = [tracks, artists, playlists, albums];
      nextQueryResults.forEach(results =>
        results.forEach(item => Reflect.setPrototypeOf(item, ItemPrototype()))
      );
      return Object.assign(
        {},
        ...Object.keys(queryResults).map((query, i) => {
          return {
            [query]: nextQueryResults[i]
          };
        })
      );
    };
    if (query !== "" && accessToken) {
      getQueries(query).then(nextResults => {
        console.log(nextResults);
        setQueryResults(nextResults);
      });
    }
  }, [query, accessToken]);

  return {
    query,
    setQuery,
    queryResults
  };
}
