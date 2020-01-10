import { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";
import { ItemPrototype } from "../modules/SpotifyHelper/SpotifyHelper";

export default function useLibrary(auth) {
  // Store Access

  const [libraryResults, setQueryResults] = useState({
    tracks: [],
    artists: [],
    playlists: [],
    albums: [],
    topTracks: []
  });

  // Local Variables
  const spotify = Spotify(auth.accessToken);

  // Search Handler
  useEffect(() => {
    const getQueries = async () => {
      const queries = Object.keys(libraryResults).map(type => {
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
          case "topTracks":
            return spotify.user().top("tracks");
        }
      });

      const results = await Promise.all(queries);

      const tracks = results[0].error
        ? []
        : results[0].items.map(item => item.track);

      const artists = results[1].error ? [] : results[1].artists.items;
      const playlists = results[2].error ? [] : results[2].items;
      const albums = results[3].error
        ? []
        : results[3].items.map(item => item.album);

      const topTracks = results[4].error ? [] : results[4].items;

      const nextQueryResults = [tracks, artists, playlists, albums, topTracks];
      nextQueryResults.forEach(results =>
        results.forEach(item => Reflect.setPrototypeOf(item, ItemPrototype()))
      );
      return Object.assign(
        {},
        ...Object.keys(libraryResults).map((query, i) => {
          return {
            [query]: nextQueryResults[i]
          };
        })
      );
    };
    if (auth.accessToken) {
      getQueries().then(nextResults => {
        setQueryResults(nextResults);
      });
    }
  }, [auth.accessToken]);

  return {
    libraryResults
  };
}
