import React, { useState } from "react";
import { Container } from "./styles";

// Components

import Carousel from "../../../components/Carousel/Carousel";
import SongList from "../../../components/SongList";

export default function Library(props) {
  const { topTracks } = props.results;

  return (
    <Container>
      <h2>Last Played</h2>
      <Carousel items={topTracks}></Carousel>
      <SongList {...props}></SongList>
    </Container>
  );
}
