import React from "react";

// Components
import Results from "./Results/Results";
import Result from "./Result/Result";

export default function SongList(props) {
  const { albums, tracks, artists, playlists } = props.results;
  const {
    foundTracks,
    setFindQuery,
    foundTracksName,
    addTrack,
    removeTrack,
    filter,
    setFilter,
    query
  } = props;

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

  return (
    <>
      {foundTracks ? (
        <FoundTracks></FoundTracks>
      ) : (
        <Results
          {...{
            query,
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
      )}
    </>
  );
}
