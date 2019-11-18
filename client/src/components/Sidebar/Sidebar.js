import React from "react";
import { Link } from "react-router-dom";
import { Container, HomeIcon, SearchIcon, LibraryIcon } from "./styles";
export default function Sidebar() {
  return (
    <Container>
      <Link to="/room/5d47d90a191f0f30a0d73414">
        <HomeIcon></HomeIcon>
        <p>Home</p>
      </Link>
      <Link to="/room/5d47d90a191f0f30a0d73414/search">
        <SearchIcon></SearchIcon>
        <p>Search</p>{" "}
      </Link>
      <Link to="/room/5d47d90a191f0f30a0d73414/library">
        <LibraryIcon></LibraryIcon>
        <p>Library</p>
      </Link>
    </Container>
  );
}
