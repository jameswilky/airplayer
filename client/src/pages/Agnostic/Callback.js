import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

const getHashParams = () => {
  let hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
};

export default function Callback(props) {
  const { setAuthData, isAuthenticated } = props;

  useEffect(() => {
    const nextAuthData = {
      accessToken: getHashParams().access_token,
      refreshToken: getHashParams().refresh_token,
      accessTokenCreationTime: Date.now()
    };

    localStorage.setItem("authData", JSON.stringify(nextAuthData));

    setAuthData({ ...nextAuthData, isAuthenticated: true });
  });

  return isAuthenticated ? (
    <Redirect to={`/`}></Redirect>
  ) : (
    <div>Logging in to spotify Please wait...</div>
  );
}
