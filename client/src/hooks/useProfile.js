import React, { useState, useEffect } from "react";
import Spotify from "../modules/Spotify";

export default function useProfile(auth) {
  const [user, setUser] = useState(null);

  const spotify = Spotify(auth.accessToken);

  useEffect(() => {
    if (auth.accessToken)
      spotify
        .user()
        .me()
        .then(data => setUser(data));
  }, [auth.accessToken]);

  return user;
}
