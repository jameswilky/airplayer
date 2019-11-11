import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Home from "../Home/Home";
import { useSelector } from "react-redux";
import useSearch from "../../../hooks/useSearch/useSearch";

import theme from "../../../theme";

import SpotifyWebplayer from "../../../components/SpotifyWebplayer/SpotifyWebplayer";

import useRoom from "../../../hooks/useRoom";

const Background = styled.div`
  background: ${props => props.theme.gradient};
`;
const Container = styled.div`
  display: grid;
  width: 100%;
  color: ${props => props.theme.white};
  grid-template-columns: 160px 1fr;
  grid-template-rows: 40px calc(100vh - 120px) 80px;
`;
const Header = styled.header`
  padding: 10px;
`;

const Sidebar = styled.nav`
  grid-row: span 2;
  padding: 10px;
  background-color: ${props => props.theme.transparent1};
`;

const Main = styled.main``;

const Footer = styled.footer`
  grid-column: span 2;
  color: ${props => props.theme.white};
  height: 100%;
`;

export default function Room() {
  const accessToken = useSelector(state => state.auth.accessToken);
  const { queryResults } = useSearch();

  const room = useRoom();
  const {
    controller: { joinRoom, addTrack, removeTrack }
  } = room;
  useEffect(() => {
    joinRoom("5d47d90a191f0f30a0d73414");
  }, []);

  return (
    <Background>
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
          <Home room={room}></Home>
        </Main>
        <Footer>
          {accessToken && room.state && room.state.currentSong && (
            <SpotifyWebplayer
              token={accessToken}
              room={room}
            ></SpotifyWebplayer>
          )}
        </Footer>
      </Container>
    </Background>
  );
}
