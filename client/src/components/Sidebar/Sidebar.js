import React from "react";
import { Link } from "react-router-dom";
import { Container, HomeIcon, SearchIcon, LibraryIcon } from "./styles";
export default function Sidebar({ path }) {
  return (
    <Container>
      <Link to={path}>
        <HomeIcon></HomeIcon>
        <p>Home</p>
      </Link>
      <Link to={`${path}/search`}>
        <SearchIcon></SearchIcon>
        <p>Search</p>{" "}
      </Link>
      <Link to={`${path}/library`}>
        <LibraryIcon></LibraryIcon>
        <p>Library</p>
      </Link>
    </Container>
  );
}
