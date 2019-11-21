// Deps
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

// Pages
import Home from "../Home/Home";
import Search from "../Search/Search";
import Library from "../../Agnostic/Library/Library";

// Styles
import { Background, Container, Footer, Main } from "./styles";

// Components
import SpotifyWebplayer from "../../../components/SpotifyWebplayer/SpotifyWebplayer";
import DesktopHeader from "../../../components/DesktopHeader/DesktopHeader";
import Sidebar from "../../../components/Sidebar/Sidebar.js";

// Hooks
import useRoom from "../../../hooks/useRoom";
import useAuth from "../../../hooks/useAuth";
import useRoomTracks from "../../../hooks/useRoomTracks";
import useSearch from "../../../hooks/useSearch/useSearch";
import useLibrary from "../../../hooks/useLibrary";

export default function Room(props) {
  const { accessToken } = useAuth();

  const room = useRoom();
  const { roomTracks } = useRoomTracks(room);

  const { libraryResults } = useLibrary();
  const { query, setQuery, queryResults } = useSearch("tobi");

  const {
    controller: { joinRoom, addTrack, removeTrack }
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

  const [filter, setFilter] = useState("");

  return (
    <Background>
      <Container>
        <Sidebar></Sidebar>
        <DesktopHeader
          filter={filter}
          setFilter={setFilter}
          query={query}
          setQuery={setQuery}
        ></DesktopHeader>
        <Main>
          {room && libraryResults && libraryResults.topTracks && (
            <>
              {" "}
              <Route
                exact
                path={`${path}`}
                component={() => (
                  <Home
                    room={room}
                    roomTracks={roomTracks}
                    topTracks={libraryResults.topTracks}
                  ></Home>
                )}
              ></Route>
              <Route
                path={`${path}/search`}
                component={() => (
                  <Search
                    results={queryResults}
                    filter={filter}
                    setFilter={setFilter}
                    addTrack={addTrack}
                    removeTrack={removeTrack}
                    query={query}
                  ></Search>
                )}
              ></Route>
              <Route
                path={`${path}/library`}
                component={() => (
                  <Library results={libraryResults} {...props}></Library>
                )}
              ></Route>
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
