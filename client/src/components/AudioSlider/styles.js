import styled from "styled-components";

export const Slider = styled.div`
  background: ${props => props.theme.lighterGray};
  position: absolute;
  bottom: 80px;
  width: 100%;
  height: 15px;

  & > input {
    position: relative;
    width: 100%;
    height: 15px;
    z-index: 99;
    cursor: pointer;
  }
`;

export const ProgressBar = styled.div.attrs(({ width }) => ({
  style: {
    width
  }
}))`
  position: absolute;
  height: 15px;
  background: ${props => props.theme.gradient};
`;
