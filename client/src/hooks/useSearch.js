import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";

const token =
  "BQB46OdxdSR-5WTBH5StFa_Jy5DLGAqaTcuawFZSSIUL_UJ8VMQg3URFD-QJNl0p3i9EreGCkjlVMjTvytpnvGudHgMneVIaYL9cS4zRrH2xcs5tfWuxZT4I2lTr4ECca7qs6-RtyxetSVcLS5aCMsmK1YJjqAroc8-QwuK2bRnyor6mUnuO";
export default function useSearch() {
  const [query, setQuery] = useState("");
  const spotify = Spotify(token, true);

  let x = spotify.search({ query: "tobi", type: "artist" });
  console.log(x);
  return { query, setQuery };
}
