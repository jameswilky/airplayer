import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

// Pages
import Home from "../../Desktop/Home/Home";
import Search from "../../Agnostic/Search/Search";
import Library from "../../Agnostic/Library/Library";

// Styles
import { Background, Container, Footer, Main, Spinner } from "./styles";
import theme from "../../../theme";

// Components
import SpotifyWebplayer from "../../../components/SpotifyWebplayer/SpotifyWebplayer";
import DesktopHeader from "../../../components/DesktopHeader/DesktopHeader";
import Sidebar from "../../../components/Sidebar/Sidebar.js";
import Message from "../../../components/Message/Message";

export default function RoomView(props) {
  const [filter, setFilter] = useState("");
  const [startAudio, setStartAudio] = useState(false);

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
    auth,
    match,
    roomSuccess,
    roomError,
    loaded,
    toggleTheme
  } = props;

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    //Redirect to search when query is entered
    if (query) {
      setRedirect(true);
    }
  }, [query]);

  useEffect(() => {
    const route = props.history.location.pathname.split("/")[3];

    if (route !== "search" && redirect === true) {
      //Remove redirect after manually changing routes
      setRedirect(false);
    }
  }, [props.history.location, redirect]);

  useEffect(() => {
    // Clear find query on re-route
    setFindQuery({ uri: "", name: "" });
  }, [props.history.location]);

  return (
    <Background>
      <Container>
        <Sidebar path={match.url} toggleTheme={toggleTheme}></Sidebar>
        <DesktopHeader
          filter={filter}
          setFilter={setFilter}
          query={query}
          setQuery={setQuery}
        ></DesktopHeader>
        {loaded ? (
          <Main>
            <Route
              exact
              path={`${match.path}`}
              component={() => (
                <Home
                  room={room}
                  setStartAudio={setStartAudio}
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
                  setQuery={setQuery}
                  foundTracksName={findResult.name}
                  foundTracks={findResult.tracks}
                  setFindQuery={setFindQuery}
                ></Search>
              )}
            ></Route>
            {redirect ? (
              <Redirect to={`/room/${room.state.id}/search`}></Redirect>
            ) : (
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
                    selectedTracks={roomTracks.playlist}
                  ></Library>
                )}
              ></Route>
            )}
          </Main>
        ) : (
          <Spinner type="Bars" color={theme.white}></Spinner>
        )}

        <Footer>
          <Message success={roomSuccess} error={roomError}></Message>
          {playerReady && room && room.state.isHost && loaded && (
            <SpotifyWebplayer
              auth={auth}
              room={room}
              roomTracks={roomTracks}
              start={startAudio}
              setStart={setStartAudio}
            ></SpotifyWebplayer>
          )}
        </Footer>
      </Container>
    </Background>
  );
}
