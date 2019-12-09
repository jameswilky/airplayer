import { useState } from "react";
import useInterval from "./useInterval";

export default function useAuth(auth) {
  const anHour = 3600000; // in milliseconds

  const initialState = {
    accessToken: null,
    refreshToken: null,
    accessTokenCreationTime: null
  };

  const [authData, setAuthData] = useState(
    auth
      ? {
          ...auth,
          isAuthenticated: Date.now() - auth.accessTokenCreationTime < anHour
        }
      : initialState
  );

  // pushed into App.js, test later
  //Check local storage for authentication data
  // useEffect(() => {
  //   const prevAuthData = JSON.parse(localStorage.getItem("authData"));
  //   if (prevAuthData) setAuthData(prevAuthData);
  // }, []);

  const refreshToken = () =>
    fetch(`/auth/refreshToken?refresh_token=${authData.refreshToken}`)
      .then(res => res.json())
      .then(data => {
        const nextAuthData = {
          ...authData,
          accessToken: data.access_token,
          accessTokenCreationTime: Date.now()
        };
        localStorage.setItem("authData", JSON.stringify(nextAuthData));
        setAuthData({ ...nextAuthData, isAuthenticated: true });
      });

  // Refresh token after an hour
  useInterval(
    () => refreshToken(),
    authData.accessTokenCreationTime
      ? authData.accessTokenCreationTime - Date.now() + anHour
      : 5000
  );

  const login = () => {
    window.location.href =
      process.env.NODE_ENV === "production"
        ? "https://airplayer.herokuapp.com/auth/login"
        : "http://localhost:8888/auth/login";
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
    isAuthenticated: authData.isAuthenticated,
    accessToken: authData.accessToken
  };
}
