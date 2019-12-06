import React from "react";
import {
  Container,
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  StyledLink
} from "./styles";
export default function Sidebar({ path, toggleTheme }) {
  const route = window.location.pathname.split("/")[3];
  return (
    <Container>
      <StyledLink to={path}>
        <HomeIcon></HomeIcon>
        <p>Home</p>
      </StyledLink>
      <StyledLink to={`${path}/search`}>
        <SearchIcon></SearchIcon>
        <p>Search</p>{" "}
      </StyledLink>
      <StyledLink to={`${path}/library`}>
        <LibraryIcon></LibraryIcon>
        <p>Library</p>
      </StyledLink>
      <div>
        {" "}
        <button onClick={toggleTheme}>
          {localStorage.getItem("theme") === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
    </Container>
  );
}
