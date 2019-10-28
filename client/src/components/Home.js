import React from "react";
import { Link } from "react-router-dom";
import Auth from "../modules/Auth";
import { useSelector } from "react-redux";

export default function Home(props) {
  const { login, logout } = Auth;
  const auth = useSelector(state => state.auth);
  return (
    <>
      <h2>Search for parties in your area</h2>
      <input type="text" placeholder="enter a party name" />
      in
      <input type="text" placeholder="enter your location" />
      <button>
        {" "}
        <Link to="/roomsearch">Search</Link>{" "}
      </button>
      <br />
      or
      <br />
      <button>
        {" "}
        <Link to="/createroom">Create your own</Link>{" "}
      </button>
      <button onClick={logout}>Log out</button>
      <button onClick={login}>Log in</button>
    </>
  );
}
