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
  const { setAuthData } = props;

  useEffect(() => {
    const nextAuthData = {
      accessToken: getHashParams().access_token,
      refreshToken: getHashParams().refresh_token,
      accessTokenCreationTime: Date.now()
    };

    localStorage.setItem("authData", JSON.stringify(nextAuthData));

    setAuthData({ ...nextAuthData, isAuthenticated: true });
    window.location.href = "/";
  }, []);
  return <div></div>;
}
