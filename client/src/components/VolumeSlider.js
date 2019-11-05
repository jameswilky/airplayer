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
  height: 70px;
`;

const SliderBackground = styled.div`
  background: ${props => props.theme.white};
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

export default function VolumeSlider({ show, setShow, volume }) {
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
          styles={{
            thumb: {
              width: 20,
              height: 10,
              backgroundColor: theme.gray,
              borderRadius: "3px",
              opacity: show ? 1 : 0,
              transition: "opacity 0.4s"
            },
            track: {
              backgroundColor: theme.primary,
              height: show ? "130px" : "0px",
              transition: "height 0.4s"
            }
          }}
        ></Slider>
      </SliderBackground>
    </HoverArea>
  );
}
