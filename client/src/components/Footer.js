import React from "react";
import styled, { css } from "styled-components";

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
`;

const Button = styled.div``;

export default function Footer() {
  return (
    <Container>
      <Body>
        <Underlay>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </Underlay>
        <Button>
          <i class="fas fa-music" />
        </Button>
        <Button>
          <i class="fas fa-search" />
        </Button>
        <Button>
          <i class="fas fa-heart" />
        </Button>
      </Body>
    </Container>
  );
}
