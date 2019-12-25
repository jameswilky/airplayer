import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function Callback(props) {
  useEffect(() => {
    console.log(props);
    props.auth.login();

    window.location.href = "/";
  }, []);
  return <div></div>;
}
