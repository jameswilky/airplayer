import React, { useState } from "react";
import { Container } from "./styles";

// Components

import Carousel from "../../../components/Carousel/Carousel";
import SongList from "../../../components/SongList";

export default function Library(props) {
  const { topTracks } = props.results;
  const { selectedTracks, addTrack, removeTrack } = props;

  return (
    <Container>
      <h2>Last Played</h2>
      <Carousel
        items={topTracks}
        addItem={addTrack}
        removeItem={removeTrack}
        selectedItems={selectedTracks}
      ></Carousel>
      <SongList {...props}></SongList>
    </Container>
  );
}
