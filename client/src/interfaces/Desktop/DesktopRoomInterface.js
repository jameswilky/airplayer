import React from "react";
import styled from "styled-components";
import DesktopHomeInterface from "./DesktopHomeInterface";
import { useSelector } from "react-redux";
import useSearch from "../../hooks/useSearch/";
import SpotifyPlayer from "react-spotify-web-playback";
import theme from "../../theme";
import usePlayer from "../../hooks/usePlayer";

const Container = styled.div`
  display: grid;
  width: 100%;
  color: ${props => props.theme.white};
  grid-template-columns: 160px 1fr;
  grid-template-rows: 40px calc(100vh - 120px) 80px;
  background: #ffafbd;
  background: linear-gradient(to top, #ffc3a0, #ffafbd);
`;
const Header = styled.header`
  padding: 10px;
`;

const Sidebar = styled.nav`
  grid-row: span 2;
  padding: 10px;
  background-color: ${props => props.theme.lightestGray};
`;

const Main = styled.main``;

const Footer = styled.footer`
  grid-column: span 2;
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.white};
  height: 100%;
`;

export default function DesktopRoomInterface() {
  const accessToken = useSelector(state => state.auth.accessToken);
  const { queryResults } = useSearch();
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
      <Footer>
        {accessToken && (
          <SpotifyPlayer
            token={accessToken}
            uris={
              queryResults.tracks &&
              queryResults.tracks.map(result => result.uri)
            }
            styles={{
              height: `80px`,
              bgColor: theme.white,
              color: theme.secondary,
              loaderColor: theme.secondary,
              sliderColor: theme.primary,
              trackArtistColor: theme.darkGray,
              trackNameColor: theme.black
            }}
          ></SpotifyPlayer>
        )}
      </Footer>
    </Container>
  );
}
