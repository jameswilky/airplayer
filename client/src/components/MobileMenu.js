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
  position: fixed;
  background-color: rgba(20, 20, 20, 1);

  & i {
    color: whitesmoke;
  }
`;

export default function MobileMenu() {
  return (
    <Container>
      <Body>
        <Underlay>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </Underlay>
        <Link to="/room/5d47d90a191f0f30a0d73414">
          <i className="fas fa-music" />
        </Link>
        <Link to="/room/5d47d90a191f0f30a0d73414/search">
          <i className="fas fa-search" />
        </Link>
        <Link to="/room/5d47d90a191f0f30a0d73414/library">
          <i className="fas fa-heart" />
        </Link>
      </Body>
    </Container>
  );
}
