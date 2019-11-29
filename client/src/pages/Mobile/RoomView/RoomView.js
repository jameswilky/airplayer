import React, { useState } from "react";
import { Route } from "react-router-dom";

import Home from "../Home/Home";
import Search from "../Search/Search";
import Library from "../../Agnostic/Library/Library";
import Footer from "../../../components/MobileMenu";
import styled from "styled-components";

const Container = styled.div`
  color: ${props =>
    props.theme.mode === "dark" ? props.theme.white : props.theme.black};

  background-color: ${props =>
    props.theme.mode === "dark" ? props.theme.black : props.theme.white};

  font-size: 1.5rem;
  overflow: scroll;
`;

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
    match
  } = props;

  return (
    <Container>
      <Route
        exact
        path={`${match.path}`}
        component={() => <Home roomTracks={roomTracks}></Home>}
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
      <Footer path={match.url} />
    </Container>
  );
}
