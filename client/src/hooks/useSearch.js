import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";
import { useSelector } from "react-redux";

export default function useSearch() {
  // Store Access
  const accessToken = useSelector(state => state.auth.accessToken);

  // Local State
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState({
    tracks: null,
    artists: null,
    playlists: null,
    albums: null
  });

  const toItems = results =>
    Object.assign(
      {},
      ...Object.entries(results).map(obj => {
        return obj[1] === null
          ? { [obj[0]]: [] }
          : {
              [obj[0]]: Object.values({ ...obj[1].items })
            };
      })
    );

  // Local Variables
  const spotify = Spotify(accessToken);

  // Search Handler
  useEffect(() => {
    const getQueries = async query => {
      const queries = Object.keys(queryResults).map(type =>
        spotify.search({ query, type })
      );
      const results = await Promise.all(queries);
      return Object.assign({}, ...results);
    };

    getQueries("tobi").then(nextResults => setQueryResults(nextResults));
  }, []);
  return { query, setQuery, queryResults, toItems };
}
