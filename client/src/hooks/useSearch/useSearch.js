import { useState, useEffect, useCallback } from "react";
import Spotify from "../../modules/Spotify";
import useDebounce from "../useDebounce";
import { getKey } from "../../helpers/ObjectUtils";
import SpotifyHelper from "../../modules/SpotifyHelper/SpotifyHelper";

export default function useSearch(auth) {
  // Store Access
  // Local State
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState({
    tracks: {},
    artists: {},
    playlists: {},
    albums: {}
  });

  // Local Variables
  const spotify = Spotify(auth.accessToken);

  const getQueries = useCallback(
    async query => {
      const queries = Object.keys(queryResults).map(type =>
        spotify.search({ query, type })
      );
      const results = await Promise.all(queries);
      return Object.assign(
        {},
        ...Object.keys(queryResults).map((query, i) => {
          return {
            [query]:
              getKey(results[i]) === "error" ? results[i] : results[i][query]
          };
        })
      );
    },
    [query, queryResults]
  );

  // Search handler, triggers when query updates, with 200 millisecond delay, and using the latest query to send
  useDebounce(
    () => {
      if (query !== "" && auth.accessToken) {
        getQueries(query).then(nextResults => {
          setQueryResults(nextResults);
        });
      }
    },
    200,
    [query, auth.accessToken]
  );

  return {
    query,
    setQuery,
    queryResults: SpotifyHelper(queryResults).getItems()
  };
}
