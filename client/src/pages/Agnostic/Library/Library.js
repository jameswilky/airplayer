import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { Route, Switch } from "react-router-dom";

// Components
import Results from "../../../components/Results/Results";
import Result from "../../../components/Result/Result";
import Carousel from "../../../components/Carousel/Carousel";

// Hooks

export default function Library(props) {
  const [filter, setFilter] = useState("");
  const { albums, tracks, artists, playlists, topTracks } = props.results;
  const { foundTracks, setQueryString } = props;

  // TODO if path contains playlists/albums/artists search for the items in that item
  // pass that to the result
  // then add actions to add in those tracks
  // Abstract this into a 'songList and reuse it for search component

  const FoundTracks = () => (
    <Result
      {...{
        title: "Album name",
        items: foundTracks,
        filter,
        setFilter,
        actions: [
          { icon: <>+</>, func: () => {}, type: "ADD" },
          { icon: <>-</>, func: () => {}, type: "REMOVE" }
        ]
      }}
    ></Result>
  );

  const LibraryResults = () => (
    <Results
      {...{
        filter,
        setFilter,
        results: [
          {
            title: "Tracks",
            items: tracks,
            actions: [
              { icon: <>+</>, func: () => {}, type: "ADD" },
              { icon: <>-</>, func: () => {}, type: "REMOVE" }
            ]
          },
          {
            title: "Albums",
            items: albums,
            onClick: (e, item) => setQueryString(item.uri)
          },
          {
            title: "Artists",
            items: artists,
            onClick: (e, item) => setQueryString(item.uri)
          },
          {
            title: "Playlists",
            items: playlists,
            onClick: (e, item) => setQueryString(item.uri)
          }
        ]
      }}
    ></Results>
  );
  return (
    <Container>
      <h2>Last Played</h2>
      <Carousel items={topTracks}></Carousel>
      {foundTracks ? (
        <FoundTracks></FoundTracks>
      ) : (
        <LibraryResults></LibraryResults>
      )}
    </Container>
  );
}
