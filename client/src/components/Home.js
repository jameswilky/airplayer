import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h2>Search for parties in your area</h2>
      <input type="text" placeholder="enter a party name" />
      in
      <input type="text" placeholder="enter your location" />
      <br />
      or
      <br />
      <button>
        {" "}
        <Link to="/roomsearch">Create your own</Link>{" "}
      </button>
    </>
  );
}
