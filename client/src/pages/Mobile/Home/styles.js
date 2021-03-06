import styled from "styled-components";
import Loader from "react-loader-spinner";
import deviceHasHeader from "../../../modules/deviceHasHeader";

export const Container = styled.div`
  height: ${props =>
    deviceHasHeader() ? `calc(92vh - 56px)` : "calc(100vh - 56px)"};
  position: relative;
  display: grid;
`;

export const StyledList = styled.ul`
  padding: 0 ${props => 2 * props.theme.unit + "px"};
`;
export const Spinner = styled(Loader)`
  justify-self: center;
  align-self: center;
`;
export const StyledItem = styled.li`
  font-size: 0.8rem;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  margin-bottom: ${props => 2 * props.theme.unit + "px"};
  align-items: center;
  width: 100%;
  background-color: ${props =>
    props.theme.mode === "dark" ? "" : props.theme.transparent3};

  & img {
    height: ${props => 6 * props.theme.unit + "px"};
    width: ${props => 6 * props.theme.unit + "px"};
  }
  & div {
    padding: 0 0 0 ${props => 1 * props.theme.unit + "px"};
    overflow: hidden;
    & h3 {
      font-size: 0.8rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & p {
      display: inline;
      color: ${props =>
        props.theme.mode === "dark"
          ? props.theme.transparent4
          : props.theme.transparentBlack};
      font-weight: 100;
      text-transform: capitalize;
    }
  }

  & button {
    height: ${props => 6 * props.theme.unit + "px"};
    width: ${props => 6 * props.theme.unit + "px"};
    background: none;
    border: none;
    color: whitesmoke;
    font-size: 2rem;
    text-align: center;
    text-justify: center;
  }
  & li {
    display: inline;
    text-transform: capitalize;
  }
  & li:first-child::after {
    content: "•";
    color: white;
    padding: 0 3px;
  }
`;
