// Deps
import React, { useEffect, useState } from "react";

import DesktopView from "../../Desktop/RoomView/RoomView";
import MobileView from "../../Mobile/RoomView/RoomView";

// Hooks
import useRoom from "../../../hooks/useRoom";
import useRoomTracks from "../../../hooks/useRoomTracks";
import useSearch from "../../../hooks/useSearch/useSearch";
import useLibrary from "../../../hooks/useLibrary";
import useFind from "../../../hooks/useFind";
import useBreakpoint from "../../../hooks/useBreakpoint";
export default function Room(props) {
  const accessToken = props.accessToken;
  const { room, roomSuccess, roomError } = useRoom();
  const { roomTracks } = useRoomTracks(accessToken, room);

  const { libraryResults } = useLibrary(accessToken);
  // TODO change to searchQuery
  const { query, setQuery, queryResults } = useSearch(accessToken);
  const [findResult, setFindQuery] = useFind(accessToken);

  const playerReady =
    accessToken &&
    room.state &&
    room.state.currentSong &&
    roomTracks &&
    roomTracks.currentSong;

  const { breakpoint } = useBreakpoint();

  useEffect(() => {
    room.controller.joinRoom("5d47d90a191f0f30a0d73414");
  }, []); // should be outside this component

  const viewProps = {
    playerReady,
    room,
    roomTracks,
    findResult,
    setFindQuery,
    query,
    setQuery,
    queryResults,
    libraryResults,
    accessToken,
    roomSuccess,
    roomError,
    ...props
  };

  return (
    <>
      {room && roomTracks && roomTracks.currentSong ? (
        breakpoint === "mobile" ? (
          <MobileView {...viewProps}></MobileView>
        ) : (
          <DesktopView {...viewProps}></DesktopView>
        )
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
