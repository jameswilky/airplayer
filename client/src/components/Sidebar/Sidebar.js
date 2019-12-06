import React from "react";
import {
  Container,
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  StyledLink
} from "./styles";
export default function Sidebar({ path }) {
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
    </Container>
  );
}
