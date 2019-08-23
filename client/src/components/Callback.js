import React, { useEffect } from "react";
import Auth from "../modules/Auth";
import { useDispatch } from "react-redux";

export default function Callback(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_ACCESS_TOKEN", payload: Auth.setAccessToken() });
    dispatch({ type: "SET_REFRESH_TOKEN", payload: Auth.setRefreshToken() });

    props.history.goBack();
  });

  return <div />;
}
