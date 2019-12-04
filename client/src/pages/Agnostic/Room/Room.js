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
  const accessToken = props.accessToken;
  const { room, roomSuccess, roomError } = useRoom();
  const { roomTracks } = useRoomTracks(accessToken, room);

  const { libraryResults } = useLibrary(accessToken);
  // TODO change to searchQuery
  const { query, setQuery, queryResults } = useSearch(accessToken);
  const [findResult, setFindQuery] = useFind(accessToken);
  const user = useProfile(accessToken);

  const playerReady =
    accessToken &&
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
      room.controller.joinRoom(id, user.uri, "");
    }
  }, [user]);

  const [isHost, setIsHost] = useState(false);

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
    isHost,
    ...props
  };

  return (
    <>
      {room ? (
        breakpoint === "mobile" ? (
          <MobileView {...viewProps}></MobileView>
        ) : (
          <>
            <button onClick={() => setIsHost(!isHost)}>
              {isHost ? "hosting" : "client"}
            </button>
            <DesktopView {...viewProps}></DesktopView>
          </>
        )
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
