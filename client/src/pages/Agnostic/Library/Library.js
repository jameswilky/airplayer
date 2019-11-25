import React, { useState } from "react";
import { Container } from "./styles";

// Components
import Results from "../../../components/Results/Results";
import Result from "../../../components/Result/Result";
import Carousel from "../../../components/Carousel/Carousel";

export default function Library(props) {
  const [filter, setFilter] = useState("");
  const { albums, tracks, artists, playlists, topTracks } = props.results;
  const {
    foundTracks,
    setFindQuery,
    foundTracksName,
    addTrack,
    removeTrack
  } = props;

  // TODO if path contains playlists/albums/artists search for the items in that item
  // pass that to the result
  // then add actions to add in those tracks
  // Abstract this into a 'songList and reuse it for search component

  const FoundTracks = () => (
    <Result
      {...{
        title: foundTracksName,
        items: foundTracks,
        filter,
        actions: [
          { icon: <>+</>, func: addTrack, type: "ADD" },
          { icon: <>-</>, func: removeTrack, type: "REMOVE" }
        ],
        handleHeaderClick: function(e) {
          setFindQuery({ name: "", uri: "" });
        }
      }}
    ></Result>
  );

  const LibraryResults = () => (
    <Results
      {...{
        filter,
        results: [
          {
            title: "Tracks",
            items: tracks,
            actions: [
              { icon: <>+</>, func: addTrack, type: "ADD" },
              { icon: <>-</>, func: removeTrack, type: "REMOVE" }
            ],
            onHeaderClick: function(e, { title }) {
              setFilter(filter === title ? "" : title);
            }
          },
          {
            title: "Albums",
            items: albums,
            onItemClick: (e, item) =>
              setFindQuery({ uri: item.uri, name: item.name }),
            onHeaderClick: function(e, { title }) {
              setFilter(filter === title ? "" : title);
            }
          },
          {
            title: "Artists",
            items: artists,
            onItemClick: (e, item) =>
              setFindQuery({ uri: item.uri, name: item.name }),

            onHeaderClick: function(e, { title }) {
              setFilter(filter === title ? "" : title);
            }
          },
          {
            title: "Playlists",
            items: playlists,
            onItemClick: (e, item) =>
              setFindQuery({ uri: item.uri, name: item.name }),
            onHeaderClick: function(e, { title }) {
              setFilter(filter === title ? "" : title);
            }
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
