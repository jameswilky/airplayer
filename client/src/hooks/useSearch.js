import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";

const token =
  "BQABDMeIyXo3ASU3oiLo_D4VDTnmQnxruIXCmJdp_WtMOUKiv3rccu76iftsrjwrRLzEzPpBrXOXZG6pSSGhoGbPMUmiQAhzr-BRlTMjUDh1DXpvPniFeqnc-O_vSw_H7GwONktPSH5e6sEX2bpgRaydl3LUgx1Aqxewk-9NXaxmopNKQk7z";
export default function useSearch() {
  const [query, setQuery] = useState("");
  const spotify = Spotify(token);
  const queryTypes = ["tracks", "artists", "albums", "playlists"];

  useEffect(() => {
    const promises = queryTypes.map(queryType =>
      spotify.search({ query: "tobi", type: queryType })
    );
    Promise.all(promises).then(values => console.log(values));
  });
  return { query, setQuery };
}
