import React, { useEffect, useState } from "react";
import useInterval from "./useInterval";

export default function useAuth(auth) {
  const initialState = {
    accessToken: null,
    refreshToken: null,
    accessTokenCreationTime: null
  };

  const [authData, setAuthData] = useState(auth ? auth : initialState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const anHour = 3600000; // in milliseconds
  const server = "http://localhost:8888";

  //Check local storage for authentication data
  useEffect(() => {
    const prevAuthData = JSON.parse(localStorage.getItem("authData"));
    if (prevAuthData) setAuthData(prevAuthData);
  }, []);

  // Refresh token after an hour
  useEffect(() => {
    let timer;
    if (authData.accessToken && authData.accessTokenCreationTime) {
      timer = setTimeout(() => {
        fetch(
          `${server}/auth/refreshToken?refresh_token=${authData.accessToken}`
        )
          .then(res => res.json())
          .then(data =>
            setAuthData({
              ...authData,
              accessToken: data.acces_token,
              accessTokenCreationTime: Date.now()
            })
          );
      }, authData.accessTokenCreationTime - Date.now() + anHour);
    }

    return () => clearTimeout(timer);
  }, [authData.accessToken]);

  //Updated boolean to let consumer now that we are authenticated
  useEffect(() => {
    if (authData.accessToken) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [authData.accessToken]);

  const login = () => {
    window.location.href = server + "/auth/login";
  };

  const logout = () => {
    const url = "https://www.spotify.com/logout/";
    const spotifyWindow = window.open(
      url,
      "Spotify Logout",
      "width=700,height=500,top=40,left=40"
    );

    setTimeout(() => {
      spotifyWindow.close();
      localStorage.removeItem("authData");
      setAuthData(initialState);
      window.location.reload();
    }, 2000);
  };

  return {
    login,
    logout,
    authData,
    setAuthData,
    isAuthenticated,
    accessToken: authData.accessToken
  };
}
