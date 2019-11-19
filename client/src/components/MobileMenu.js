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
  border-top: 1px solid ${props => props.theme.white};
  justify-items: center;
`;
const Underlay = styled.div`
  ${Row}
  position:absolute;
  top: 0px;
  right: 5px;
  pointer-events: none;
`;

const Container = styled.div`
  height: ${props => 7 * props.theme.unit + "px"};
  width: 100%;
  position: fixed;
  background-color: ${props => props.theme.darkestGray};
  background-image: ${props =>
    props.theme.mode === "light" && props.theme.gradient};
  & i {
    color: ${props => props.theme.white};
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
