// Deps
import React, { useEffect, useState } from "react";

import DesktopView from "../../Desktop/RoomView/RoomView";
import MobileView from "../../Mobile/RoomView/RoomView";
import io from "socket.io-client";

// Hooks
import useRoomTracks from "../../../hooks/useRoomTracks";
import useSearch from "../../../hooks/useSearch/useSearch";
import useLibrary from "../../../hooks/useLibrary";
import useFind from "../../../hooks/useFind";
import useBreakpoint from "../../../hooks/useBreakpoint";
import useRoom from "../../../hooks/useRoom";
import useProfile from "../../../hooks/useProfile";

export default function Room(props) {
  let socket;

  const connect = () => {
    socket = io.connect(
      process.env.NODE_ENV === "production"
        ? "https://airplayer.herokuapp.com"
        : "http://localhost:8888"
    );
  };
  connect();

  const { room, roomSuccess, roomError } = useRoom();
  const { roomTracks } = useRoomTracks(props.auth, room);

  const { libraryResults } = useLibrary(props.auth);
  // TODO change to searchQuery
  const { query, setQuery, queryResults } = useSearch(props.auth);
  const [findResult, setFindQuery] = useFind(props.auth);
  const user = useProfile(props.auth);

  const playerReady =
    props.auth.accessToken &&
    room.state &&
    room.state.currentSong &&
    roomTracks &&
    roomTracks.currentSong &&
    user;

  const { breakpoint } = useBreakpoint();

  // TODO pass user Id
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      const id = window.location.pathname.split("/")[2];
      room.controller.joinRoom(id, user.uri, "", token ? token : null);
    }
  }, [user]);
  const loaded =
    room &&
    room.state &&
    room.state.currentSong &&
    room.state.currentSong.uri &&
    roomTracks &&
    roomTracks.currentSong &&
    roomTracks.currentSong.uri &&
    libraryResults &&
    (libraryResults.tracks ||
      libraryResults.artists ||
      libraryResults.albums ||
      libraryResults.playlists);

  const viewProps = {
    loaded,
    playerReady,
    room,
    roomTracks,
    findResult,
    setFindQuery,
    query,
    setQuery,
    queryResults,
    libraryResults,
    auth: props.auth,
    roomSuccess,
    roomError,
    ...props
  };

  return (
    <>
      {breakpoint === "mobile" ? (
        <MobileView {...viewProps}></MobileView>
      ) : (
        <>
          <button onClick={() => connect()}>Reconnect</button>
          <DesktopView {...viewProps}></DesktopView>
        </>
      )}
    </>
  );
}
