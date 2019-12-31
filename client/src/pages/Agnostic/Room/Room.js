// Deps
import React, { useEffect, useState } from "react";

import DesktopView from "../../Desktop/RoomView/RoomView";
import MobileView from "../../Mobile/RoomView/RoomView";

// Hooks
import useRoomTracks from "../../../hooks/useRoomTracks";
import useSearch from "../../../hooks/useSearch/useSearch";
import useLibrary from "../../../hooks/useLibrary";
import useFind from "../../../hooks/useFind";
import useBreakpoint from "../../../hooks/useBreakpoint";
import useRoom from "../../../hooks/useRoom";
import useProfile from "../../../hooks/useProfile";

export default function Room(props) {
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
      const id = window.location.pathname.split("/")[2];
      const tokens = JSON.parse(localStorage.getItem("tokens")) || {};
      const token = tokens[id];
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
          <DesktopView {...viewProps}></DesktopView>
        </>
      )}
    </>
  );
}
