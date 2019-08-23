import React from "react";
import { Link } from "react-router-dom";
import getHashParams from "./helpers/getHashParams";

export default function Home() {
  const getParams = () => console.log(getHashParams());
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
      <button onClick={getParams}>getParams</button>
      <a href="http://localhost:8888/login">Log in</a>
    </>
  );
}
