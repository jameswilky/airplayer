// Deps
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

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
import SearchBar from "../../../components/SearchBar/SearchBar";

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

  useEffect(() => {
    if (
      room.state &&
      room.state.id &&
      libraryResults &&
      libraryResults.topTracks.length > 0 &&
      user &&
      user.id &&
      props.auth.accessToken
    ) {
      const topTracks = libraryResults.topTracks.map(track => {
        return { uri: track.uri };
      });
      fetch(`/api/room/${room.state.id}/topTracks`, {
        method: "POST",
        body: JSON.stringify({
          accessToken: props.auth.accessToken,
          tracks: topTracks,
          userId: user.id
        })
      }).then(res => res.json());
      // Then trigger a research for rooms
      // .then(json => console.log(json));
    }
  }, [room, libraryResults, user, props.auth]);
  console.log(roomTracks);
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
  const [filter, setFilter] = useState("");

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
    filter,
    setFilter,
    ...props
  };

  /* hacky solution required with the search bar */
  return (
    <>
      {breakpoint === "mobile" ? (
        <>
          <Route
            path={`${props.match.path}/search`}
            render={() => (
              <SearchBar
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              ></SearchBar>
            )}
          ></Route>

          <MobileView {...viewProps}></MobileView>
        </>
      ) : (
        <>
          <DesktopView {...viewProps}></DesktopView>
        </>
      )}
    </>
  );
}
