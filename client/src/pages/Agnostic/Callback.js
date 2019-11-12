import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

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
  const { authData, setAuthData } = useAuth();

  useEffect(() => {
    const nextAuthData = {
      accessToken: getHashParams().access_token,
      refreshToken: getHashParams().refresh_token,
      accessTokenCreationTime: Date.now()
    };

    localStorage.setItem("authData", JSON.stringify(nextAuthData));

    setAuthData(nextAuthData);
    props.history.goBack();
  });

  return <div />;
}
