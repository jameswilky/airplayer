import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import DesktopHomeInterface from "./DesktopHomeInterface";
import { useSelector } from "react-redux";
import useSearch from "../../hooks/useSearch/";
import SpotifyPlayer from "react-spotify-web-playback";
import theme from "../../theme";

import useRoom from "../../hooks/useRoom";

const Container = styled.div`
  display: grid;
  width: 100%;
  color: ${props => props.theme.white};
  grid-template-columns: 160px 1fr;
  grid-template-rows: 40px calc(100vh - 120px) 80px;
  background: linear-gradient(to top, #ffc3a0, #ffafbd);
`;
const Header = styled.header`
  padding: 10px;
`;

const Sidebar = styled.nav`
  grid-row: span 2;
  padding: 10px;
  background-color: ${props => props.theme.tranparent1};
`;

const Main = styled.main``;

const Footer = styled.footer`
  grid-column: span 2;
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.white};
  height: 100%;
`;

// NOTE
// For whatever reason, spotify web player requires atleast 3 tracks in a playlist

// Adding tracks manually will trigger a state update
// therefore, we will need to create a spotify playlist and then update that
export default function DesktopRoomInterface() {
  const accessToken = useSelector(state => state.auth.accessToken);
  const { queryResults } = useSearch();

  const room = useRoom();

  const {
    controller: { joinRoom, addTrack, removeTrack }
  } = room;

  useEffect(() => {
    joinRoom("5d47d90a191f0f30a0d73414");
  }, []);

  const [playlist, setPlaylist] = useState({
    tracks: null,
    update: false
  });

  useEffect(() => {
    if (playlist.tracks == null) {
      if (room && room.state && room.state.playlist) {
        setPlaylist({
          ...playlist,
          tracks: room.state.playlist.map(track => track.trackId)
        });
      }
    } else {
      if (playlist.update) {
        setPlaylist({
          ...playlist,
          tracks: room.state.playlist
            .map(track => track.trackId)
            .filter(
              (track, i) =>
                i >=
                Math.abs(room.state.playlist.length - playlist.tracks.length)
            ),
          update: false
        });
      }
    }
  });

  console.log(playlist.tracks, room.state.playlist);
  return (
    <Container>
      <Sidebar>
        <ul>
          <li>
            <b>Home</b>
          </li>
          <li>Browse</li>
          <li>Your Playlists</li>
          <li>Create Playlist</li>
          <li>Search Fav tracks</li>
        </ul>
      </Sidebar>
      <Header>
        Search Bar || Login
        <button onClick={() => addTrack(queryResults.tracks[0].uri)}>
          add track1
        </button>
        <button onClick={() => addTrack(queryResults.tracks[1].uri)}>
          add track2
        </button>{" "}
        <button onClick={() => addTrack(queryResults.tracks[2].uri)}>
          add track3
        </button>
        <button onClick={() => removeTrack(queryResults.tracks[0].uri)}>
          remove track1
        </button>
        <button onClick={() => removeTrack(queryResults.tracks[1].uri)}>
          remove track2
        </button>{" "}
        <button onClick={() => removeTrack(queryResults.tracks[2].uri)}>
          remove track3
        </button>
      </Header>
      <Main>
        {/* Depends on Route*/}
        <DesktopHomeInterface></DesktopHomeInterface>
      </Main>
      <Footer>
        {accessToken && (
          <SpotifyPlayer
            token={accessToken}
            callback={state => {
              console.log(state);
              if (state && state.type == "track_update") {
                setPlaylist({ ...playlist, update: true });
              }
            }}
            uris={playlist.tracks}
            styles={{
              height: `80px`,
              bgColor: theme.white,
              color: theme.secondary,
              loaderColor: theme.secondary,
              sliderColor: theme.primary,
              trackArtistColor: theme.darkGray,
              trackNameColor: theme.black
            }}
            persistDeviceSelection={true}
          ></SpotifyPlayer>
        )}
      </Footer>
    </Container>
  );
}
