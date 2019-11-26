import styled from "styled-components";
import { Chevron } from "../../styles/Chevron";

export const Container = styled.div`
  /* background-color: "black"; */
  height: calc(100vh - 48px);
  position: relative;
`;
export const ImageContainer = styled.div`
  /* Used to position Image */
  position: relative;
  top: 0px;
  height: ${props => props.height * 1.2 + "px"};
  width: ${props => props.width + "px"};
  margin: 0 auto;
  padding: 32px 0;
`;

export const ImageWrapper = styled.div`
  /* Adds fade effect to bottom of image*/

  height: 100%;
  &::before {
    content: "";
    background-image: ${props =>
      props.theme.mode === "dark"
        ? props.theme.blackFadeGradient
        : props.theme.whiteFadeGradient};
    position: absolute;
    height: 50%; /* based on image height*/

    /* 1 less pixel than padding amount */
    right: -1px;
    bottom: 31px;
    left: -1px;
  }
  &::after {
    content: "";
    display: block;
    height: 100vh;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: "contain";
`;

export const Overlay = styled.div`
  /* Container to position Song info*/

  position: absolute;
  min-height: ${props => 12 * props.theme.unit + "px"};
  height: ${props => `calc(100vh - 24px - ${props.height}px)`};
  width: 100%;
  bottom: 0px;
  display: grid;
`;

export const SongInfoContainer = styled.div`
  text-align: center;
  text-justify: center;
  align-self: center;

  & > h1 {
    font-weight: 700;
  }
  & > h5 {
    font-weight: 300;
    font-size: 1.7rem;
    color: ${props =>
      props.theme.mode === "dark"
        ? props.theme.transparent4
        : props.theme.transparentBlack2};
  }
  & > p {
    font-weight: 100;
    padding-top: ${props => 1 * props.theme.unit + "px"};
    font-size: 1rem;
    color: ${props =>
      props.theme.mode === "dark"
        ? props.theme.transparent3
        : props.theme.secondary};
  }
`;

export const StyledChevron = styled(Chevron)`
  bottom: ${props => 1 * props.theme.unit + "px"};
  left: calc(50% - 8px);
  &:before {
    border-style: solid;
    border-width: 1px 1px 0 0;
    content: "";
    display: inline-block;
    height: ${props => 2 * props.theme.unit + "px"};
    left: 0;
    position: relative;
    vertical-align: top;
    width: ${props => 2 * props.theme.unit + "px"};
    transform: rotate(135deg);
  }
`;
