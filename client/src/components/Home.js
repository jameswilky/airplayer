import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(auth);
  const login = () => dispatch({ type: "LOG_IN" });
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
      {/* <button onClick={login}>Login</button> */}
      <a href="http://localhost:8888/auth/login">Log in</a>
    </>
  );
}
