import React from "react";
import SongList from "../../../components/SongList";
import { Container } from "./styles";
export default function Search(props) {
  return (
    <Container>
      <SongList {...props}></SongList>
    </Container>
  );
}
