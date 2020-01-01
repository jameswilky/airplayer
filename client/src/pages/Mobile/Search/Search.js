import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import SearchBar from "../../../components/SearchBar/SearchBar";
import SongList from "../../../components/SongList";
import styled from "styled-components";
import deviceHasHeader from "../../../modules/deviceHasHeader";

const Container = styled.div`
  height: ${() =>
    deviceHasHeader() ? `calc(92vh - 216px)` : "calc(100vh - 216px)"};
  position: relative;
`;

export default function Search(props) {
  return (
    <Container>
      <SongList {...props}></SongList>
    </Container>
  );
}
