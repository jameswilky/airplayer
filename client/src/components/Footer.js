import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Row = css`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: center;
`;

const Body = styled.div`
  ${Row}
  border-top: 2px solid white;
  justify-items: center;
`;
const Underlay = styled.div`
  ${Row}
  position:absolute;
  top: 0px;
  right: 4px;
  pointer-events: none;
`;

const Container = styled.div`
  height: 50px;
  width: 100%;
  position: relative;
  & i {
    color: whitesmoke;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Body>
        <Underlay>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </Underlay>
        <Link to="/room1">
          <i className="fas fa-music" />
        </Link>
        <Link to="/room1/search">
          <i className="fas fa-search" />
        </Link>
        <Link to="/room1/likes">
          <i className="fas fa-heart" />
        </Link>
      </Body>
    </Container>
  );
}
