import React from "react";
import { gameOvaImg } from "../images";
import styled from "styled-components";

const Container = styled.div`
  /* background-color: "black"; */
  height: calc(100vh - 50px);
  position: relative;
`;
const ImageContainer = styled.div`
  /* Used to position Image */
  position: relative;
  top: 0px;
  height: 320px; /* based on image height*/
`;

const ImageWrapper = styled.div`
  /* Adds fade effect to bottom of image*/

  height: 100%;
  &::before {
    content: "";
    background-image: linear-gradient(
      to top,
      rgba(20, 20, 20, 1),
      rgba(20, 20, 20, 0)
    );
    position: absolute;
    height: 37.5%; /* based on image height*/
    right: 0;
    bottom: 0;
    left: 0;
  }
  &::after {
    content: "";
    display: block;
    height: 9999px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: "contain";
`;

const Overlay = styled.div`
  /* Container to position Song info*/

  position: absolute;
  height: calc(100vh - 50px - 320px); /* Determined by input picture*/
  width: 100%;
  bottom: 0px;
  display: grid;
`;

const SongInfoContainer = styled.div`
  text-align: center;
  text-justify: center;
  align-self: center;

  & > h1 {
    font-weight: 700;
  }
  & > h5 {
    font-weight: 300;
    font-size: 1.7rem;
    color: rgba(215, 215, 215, 1);
  }
  & > p {
    font-weight: 100;
    padding-top: 15px;
    font-size: 1rem;
    color: rgba(180, 180, 180, 1);
  }
`;

const Chevron = styled.span`
  position: absolute;
  right: calc(50% - 7.5px);
  bottom: 10px;
  opacity: 0.7;
  &:before {
    border-style: solid;
    border-width: 1px 1px 0 0;
    content: "";
    display: inline-block;
    height: 15px;
    left: 0;
    position: relative;
    vertical-align: top;
    width: 15px;
    transform: rotate(135deg);
  }
`;

export default function CurrentTrack(props) {
  const { AudioVisualizer } = props;
  return (
    <Container>
      <ImageContainer>
        <ImageWrapper>
          <Image src={gameOvaImg} />
        </ImageWrapper>
      </ImageContainer>
      <Overlay>
        <SongInfoContainer>
          <AudioVisualizer />
          <h1>Game Ova</h1>
          <h5>Tobi Lou</h5>
          <p> Up next Darude - Sandstorm</p>
        </SongInfoContainer>
      </Overlay>
      <Chevron />
    </Container>
  );
}
