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
import useRoomTracks from "../../../hooks/useRoomTracks";
import useSearch from "../../../hooks/useSearch/useSearch";
import useLibrary from "../../../hooks/useLibrary";
import useFind from "../../../hooks/useFind";

export default function Room(props) {
  const accessToken = props.accessToken;
  const room = useRoom();
  const { roomTracks } = useRoomTracks(room);

  const { libraryResults } = useLibrary(accessToken);
  // TODO change to searchQuery
  const { query, setQuery, queryResults } = useSearch(accessToken);
  const [findResult, setFindQuery] = useFind(accessToken);

  const {
    controller: { joinRoom, addTrack, removeTrack }
  } = room;

  const playerReady =
    accessToken &&
    room.state &&
    room.state.currentSong &&
    roomTracks &&
    roomTracks.currentSong;

  useEffect(() => {
    joinRoom("5d47d90a191f0f30a0d73414");
  }, []); // should be outside this component

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
                    foundTracksName={findResult.name}
                    foundTracks={findResult.tracks}
                    setFindQuery={setFindQuery}
                  ></Search>
                )}
              ></Route>
              <Route
                path={`${path}/library`}
                component={() => (
                  <Library
                    filter={filter}
                    setFilter={setFilter}
                    results={libraryResults}
                    foundTracks={findResult.tracks}
                    setFindQuery={setFindQuery}
                    addTrack={addTrack}
                    removeTrack={removeTrack}
                    foundTracksName={findResult.name}
                  ></Library>
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
