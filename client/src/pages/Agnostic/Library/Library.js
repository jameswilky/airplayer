import React, { useState } from "react";
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

  // TODO if path contains playlists/albums/artists search for the items in that item
  // pass that to the result
  // then add actions to add in those tracks
  // Abstract this into a 'songList and reuse it for search component
  return (
    <Container>
      <h2>Last Played</h2>
      <Carousel items={topTracks}></Carousel>
      <Switch>
        <Route
          path={`${props.match.path}/library/:uri`}
          component={() => (
            <Result
              {...{
                title: "Album name",
                items: [],
                filter,
                setFilter,
                actions: [
                  { icon: <>+</>, func: () => {}, type: "ADD" },
                  { icon: <>-</>, func: () => {}, type: "REMOVE" }
                ]
              }}
            ></Result>
          )}
        ></Route>
        <Route
          path={`${props.match.path}/library`}
          component={() => (
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
                    link: item => `library/${item.uri}`
                  },
                  {
                    title: "Artists",
                    items: artists,
                    link: item => `library/${item.uri}`
                  },
                  {
                    title: "Playlists",
                    items: playlists,
                    link: item => `library/${item.uri}`
                  }
                ]
              }}
            ></Results>
          )}
        ></Route>
      </Switch>
    </Container>
  );
}
