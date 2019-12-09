import React, { useEffect } from "react";
import {
  Container,
  ImageContainer,
  ImageWrapper,
  Image,
  Overlay,
  SongInfoContainer,
  StyledChevron
} from "./styles";

export default function CurrentTrack(props) {
  const { AudioVisualizer, title, artist, nextTrack, image } = props;
  return (
    <Container>
      <ImageContainer width={image.width} height={image.height}>
        <ImageWrapper>
          <Image src={image.url} />
        </ImageWrapper>
      </ImageContainer>
      <Overlay height={image.height}>
        <SongInfoContainer>
          <AudioVisualizer />
          <h1>{title}</h1>
          <h5>{artist}</h5>
          <p>
            {" "}
            Up next {nextTrack.artist} : {nextTrack.title}
          </p>
        </SongInfoContainer>
      </Overlay>
      <StyledChevron />
    </Container>
  );
}
