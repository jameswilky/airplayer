import React from "react";
import styled from "styled-components";
import DesktopHomeInterface from "./DesktopHomeInterface";
import MusicPlayerInterface from "./MusicPlayerInterface";

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 160px 1fr;
  grid-template-rows: 40px calc(100vh - 120px) 80px;
`;
const Header = styled.header`
  border: 1px solid black;
`;

const Sidebar = styled.nav`
  border: 1px solid black;
  grid-row: span 2;
`;

const Main = styled.main`
  border: 1px solid black;
`;

const Footer = styled.footer`
  border: 1px solid black;
  grid-column: span 2;
`;

export default function DesktopRoomInterface() {
  return (
    <Container>
      <Sidebar>
        <ul>
          <li>
            <b>Home</b>
          </li>
          <li>Browse</li>
          <li>Your Playlists</li>
          <li>Create Playlist</li>
          <li>Search Fav tracks</li>
        </ul>
      </Sidebar>
      <Header>Search Bar || Login</Header>
      <Main>
        {/* Depends on Route*/}
        <DesktopHomeInterface></DesktopHomeInterface>
      </Main>
      <Footer>{/* <MusicPlayerInterface></MusicPlayerInterface> */}</Footer>
    </Container>
  );
}
