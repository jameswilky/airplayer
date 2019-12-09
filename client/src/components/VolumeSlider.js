import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { IoIosVolumeHigh } from "react-icons/io";

import Slider from "react-input-slider";

import "../global.css";
import theme from "../theme";

const HoverArea = styled.div`
  align-items: center;
  display: grid;
  justify-items: center;
  width: 40px;
  height: 80px;
  z-index: 99999;
`;

const SliderBackground = styled.div`
  background: ${props =>
    props.theme.mode === "dark"
      ? props.theme.transparentBlack
      : props.theme.white};
  opacity: ${props => (props.show ? 1 : 0)};
  height: ${props => (props.show ? "160px" : 0)};
  width: 40px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  position: absolute;
  bottom: 70px;
  right: 0;
  padding: 15px;
  transition: height 0.4s, opacity 0.4s;
  /* hacky way of changing background color for slider*/
  & > div {
    & > div:first-child {
      background: #ffd5e3 !important;
    }
  }
`;

export default function VolumeSlider({ volume, setVolume }) {
  const [show, setShow] = useState(false);

  return (
    <HoverArea
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <IoIosVolumeHigh style={{ cursor: "pointer" }}></IoIosVolumeHigh>

      <SliderBackground show={show}>
        <Slider
          axis="y"
          y={100 - volume}
          onChange={({ y }) => setVolume(100 - y)}
          styles={{
            thumb: {
              width: 30,
              height: 6,
              backgroundColor: theme.white,
              borderRadius: "5px",
              opacity: show ? 1 : 0,
              transition: "opacity 0.4s",
              cursor: "pointer",
              boxShadow: "1px 1px 2px 1px rgba(0, 0, 0, 0.5)"
            },
            track: {
              backgroundColor: theme.primary,
              height: show ? "130px" : "0px",
              transition: "height 0.4s",
              cursor: "pointer"
            }
          }}
        ></Slider>
      </SliderBackground>
    </HoverArea>
  );
}
