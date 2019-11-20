import React, { useState, useEffect } from "react";
import { Container, StyledChevron } from "./styles";

// Components
import Results from "../../../components/Results/Results";
import Carousel from "../../../components/Carousel/Carousel";

// Hooks

export default function Library({ results, query }) {
  const [selected, setSelected] = useState("");
  const { albums, tracks, artists, playlists, topTracks } = results;

  return (
    <Container>
      <h2>Last Played</h2>
      <Carousel items={topTracks}></Carousel>
      <Results
        {...{
          selected,
          setSelected,
          limit: 0,
          results: [
            { title: "Albums", items: albums },
            { title: "Artists", items: artists },
            { title: "Playlists", items: playlists },
            { title: "Tracks", items: tracks }
          ]
        }}
      ></Results>{" "}
    </Container>
  );
}
