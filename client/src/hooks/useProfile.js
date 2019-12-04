import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";

export default function useProfile(accessToken) {
  const [user, setUser] = useState(null);

  const spotify = Spotify(accessToken);

  useEffect(() => {
    if (accessToken)
      spotify
        .user()
        .me()
        .then(data => setUser(data));
  }, [accessToken]);

  return user;
}
