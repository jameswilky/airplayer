import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import Home from "../Home/Home";
import Search from "../Search/Search";
import Library from "../Library/Library";
import Footer from "../../../components/MobileMenu";
import styled from "styled-components";

import useRoom from "../../../hooks/useRoom";

const Container = styled.div`
  color: ${props =>
    props.theme.mode === "dark" ? props.theme.white : props.theme.black};

  /* background-color: ${props =>
    props.theme.mode === "dark" ? props.theme.black : props.theme.white}; */

  background-image: ${props => props.theme.white};
  font-size: 1.5rem;
  overflow: scroll;
`;

export default function Room(props) {
  const roomId = props.location.pathname
    .split("/")
    .slice(-1)
    .pop();

  const {
    state,
    controller: { addTrack, joinRoom },
    error
  } = useRoom();

  useEffect(() => {
    joinRoom(roomId);
  }, []);

  const path = props.match.path;

  return (
    <Container>
      {" "}
      <Route exact path={`${path}`} component={Home}></Route>
      <Route path={`${path}/search`} component={Search}></Route>
      <Route path={`${path}/library`} component={Library}></Route>
      <Footer />
    </Container>
  );
}
