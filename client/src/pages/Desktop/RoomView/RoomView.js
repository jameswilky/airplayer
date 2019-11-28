import React, { useState } from "react";
import { Route } from "react-router-dom";

// Pages
import Home from "../../Desktop/Home/Home";
import Search from "../../Agnostic/Search/Search";
import Library from "../../Agnostic/Library/Library";

// Styles
import { Background, Container, Footer, Main } from "./styles";

// Components
import SpotifyWebplayer from "../../../components/SpotifyWebplayer/SpotifyWebplayer";
import DesktopHeader from "../../../components/DesktopHeader/DesktopHeader";
import Sidebar from "../../../components/Sidebar/Sidebar.js";
import Message from "../../../components/Message/Message";

export default function RoomView(props) {
  const [filter, setFilter] = useState("");

  const {
    query,
    setQuery,
    room,
    roomTracks,
    libraryResults,
    queryResults,
    findResult,
    setFindQuery,
    playerReady,
    accessToken,
    match,
    roomSuccess,
    roomError
  } = props;

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
          <>
            <Route
              exact
              path={`${match.path}`}
              component={() => (
                <Home
                  room={room}
                  roomTracks={roomTracks}
                  topTracks={libraryResults.topTracks}
                ></Home>
              )}
            ></Route>
            <Route
              path={`${match.path}/search`}
              component={() => (
                <Search
                  results={queryResults}
                  filter={filter}
                  setFilter={setFilter}
                  addTrack={room.controller.addTrack}
                  removeTrack={room.controller.removeTrack}
                  query={query}
                  foundTracksName={findResult.name}
                  foundTracks={findResult.tracks}
                  setFindQuery={setFindQuery}
                ></Search>
              )}
            ></Route>
            <Route
              path={`${match.path}/library`}
              component={() => (
                <Library
                  filter={filter}
                  setFilter={setFilter}
                  results={libraryResults}
                  foundTracks={findResult.tracks}
                  setFindQuery={setFindQuery}
                  addTrack={room.controller.addTrack}
                  removeTrack={room.controller.removeTrack}
                  foundTracksName={findResult.name}
                ></Library>
              )}
            ></Route>
          </>
        </Main>
        <Footer>
          <Message success={roomSuccess} error={roomError}></Message>
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
