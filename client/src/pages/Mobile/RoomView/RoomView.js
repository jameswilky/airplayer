import React, { useState } from "react";
import { Route } from "react-router-dom";

import Home from "../Home/Home";
import Search from "../Search/Search";
import Library from "../../Agnostic/Library/Library";
import Footer from "../../../components/MobileMenu";
import styled from "styled-components";

const Container = styled.div`
  animation: fadeIn 1s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
    auth,
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
            style={{ height: "90vh" }}
            results={queryResults}
            filter={filter}
            setFilter={setFilter}
            addTrack={room.controller.addTrack}
            removeTrack={room.controller.removeTrack}
            auth={auth}
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
            selectedTracks={roomTracks.playlist}
          ></Library>
        )}
      ></Route>
      <Footer path={match.url} />
    </Container>
  );
}
