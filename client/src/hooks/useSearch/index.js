import React, { useState, useEffect } from "react";
import Spotify from "../../modules/Spotify";
import { useSelector } from "react-redux";
import { getKey, getNestedProperty } from "../../helpers/ObjectUtils";
import SpotifyHelper from "../../modules/SpotifyHelper/SpotifyHelper";

export default function useSearch() {
  // Store Access
  const accessToken = useSelector(state => state.auth.accessToken);
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
    };

    if (query !== "") {
      getQueries(query).then(nextResults => {
        // console.log(nextResults);
        // console.log(getNestedProperty("items", nextResults));
        // console.log(SpotifyHelper(nextResults));
        // console.log(SpotifyHelper(nextResults).getItems());
        // setQueryResults(SpotifyHelper(nextResults));
        // console.log(queryResults);
        setQueryResults(nextResults);
      });
    }
  }, [query]);
  return {
    query,
    setQuery,
    queryResults: SpotifyHelper(queryResults).getItems()
  };
}
