import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";
import { useSelector } from "react-redux";

export default function useSearch() {
  const accessToken = useSelector(state => state.auth.accessToken);
  const [query, setQuery] = useState("");
  const spotify = Spotify(accessToken);
  const queryTypes = ["tracks", "artists", "albums", "playlists"];
  const [queryResults, setQueryResults] = useState({
    tracks: null,
    albums: null,
    playlists: null,
    albums: null
  });

  useEffect(() => {
    const promises = queryTypes.map(queryType =>
      spotify.search({ query: "tobi", type: queryType })
    );
    Promise.all(promises).then(
      results => results.map((result, i) => result[queryTypes[i]])
      //TODO finish mapping to state
    );
  }, []);
  return { query, setQuery };
}
