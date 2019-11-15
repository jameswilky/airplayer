import React, { useEffect } from "react";
import {
  Background,
  Container,
  Sidebar,
  Header,
  Footer,
  Main,
  DesktopSearchBar
} from "./styles";
import Home from "../Home/Home";
import Search from "../Search/Search";
import Library from "../Library/Library";
import { Route, Link } from "react-router-dom";

import SpotifyWebplayer from "../../../components/SpotifyWebplayer/SpotifyWebplayer";

import useRoom from "../../../hooks/useRoom";
import useAuth from "../../../hooks/useAuth";
import useRoomTracks from "../../../hooks/useRoomTracks";
import useSearch from "../../../hooks/useSearch/useSearch";

export default function Room(props) {
  const { accessToken } = useAuth();

  const room = useRoom();
  const { roomTracks } = useRoomTracks(room);

  const {
    controller: { joinRoom, addTrack }
  } = room;

  const playerReady =
    accessToken &&
    room.state &&
    room.state.currentSong &&
    roomTracks &&
    roomTracks.currentSong;

  const roomReady = room && room.state;
  useEffect(() => {
    joinRoom("5d47d90a191f0f30a0d73414");
  }, []);

  const path = props.match.path;

  const { query, setQuery, queryResults } = useSearch("tobi");

  return (
    <Background>
      <Container>
        <Sidebar>
          <ul>
            <Link to="/room/5d47d90a191f0f30a0d73414">
              <li>Home</li>
            </Link>
            <Link to="/room/5d47d90a191f0f30a0d73414/search">
              <li>Search</li>
            </Link>
            <Link to="/room/5d47d90a191f0f30a0d73414/library">
              <li>Library</li>
            </Link>
          </ul>
        </Sidebar>
        <Header>
          <DesktopSearchBar
            value={query}
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
          ></DesktopSearchBar>
          <div>Login</div>
        </Header>
        <Main>
          {roomReady && (
            <>
              {" "}
              <Route
                exact
                path={`${path}`}
                component={() => <Home room={room}></Home>}
              ></Route>
              <Route
                path={`${path}/search`}
                component={() => (
                  <Search results={queryResults} addTrack={addTrack}></Search>
                )}
              ></Route>
              <Route path={`${path}/library`} component={Library}></Route>
            </>
          )}
        </Main>
        <Footer>
          {playerReady && (
            <SpotifyWebplayer
              token={accessToken}
              room={room}
              roomTracks={roomTracks}
            ></SpotifyWebplayer>
          )}
        </Footer>
      </Container>
    </Background>
  );
}
