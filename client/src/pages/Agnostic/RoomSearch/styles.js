import StyledListItem from "../../../styles/StyledListItem";
import styled from "styled-components";
import List from "../../../components/List";

export const Background = styled.div`
  background: ${props =>
    props.theme.mode == "dark" ? props.theme.black : props.theme.gradient};
  height: 100vh;
  justify-items: center;
  display: grid;
  grid-template-rows: 5rem 2rem 1fr;
  color: ${props => props.theme.white};

  & > h1 {
    font-size: 3.9rem;
    text-shadow: 3px 3px
      ${props =>
        props.theme.mode === "dark"
          ? props.theme.transparent
          : props.theme.transparentBlack5};
    background: ${props =>
      props.theme.mode === "dark" ? props.theme.gradient : "none"};
    -webkit-background-clip: ${props =>
      props.theme.mode === "dark" ? "text" : "none"};
    background-clip: ${props =>
      props.theme.mode === "dark" ? "text" : "none"};
    -webkit-text-fill-color: ${props =>
      props.theme.mode === "dark" ? "transparent" : "none"};
    padding: 8px 0;
  }
  & > p {
    color: ${props => props.theme.transparent5};
    padding-bottom: 16px;
  }
`;

export const Container = styled.div`
  display: grid;
  position: relative;
  justify-content: center;
  align-content: center;
  min-width: ${props => 24 * props.theme.unit + "px"};
  width: 85vw;
  min-height: ${props => 50 * props.theme.unit + "px"};
  /* height: 70vh; */
  margin-bottom: 8vh;
  background-color: ${props => props.theme.transparent2};
  grid-template-rows: ${props => 6 * props.theme.unit + "px"} 1fr;
  grid-template-columns: 1fr;
  animation: fadeIn 1s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 440px) {
    width: 98vw;
  }
`;
export const Head = styled.div`
  display: grid;
  width: 100%;

  grid-template-columns: 2fr 1fr 1fr;

  & > input {
    &::placeholder {
      color: ${props =>
        props.theme.mode === "dark"
          ? props.theme.transparentBlack
          : props.theme.transparent4};
    }
    padding: ${props => 2 * props.theme.unit + "px"};
    border: none;
    border-right: 1px solid ${props => props.theme.transparentBlack4};
    background-color: ${props => props.theme.transparent4};
  }

  & > div {
    display: grid;
    cursor: pointer;

    grid-template-columns: 1fr 3fr;
    align-items: center;
    background-color: ${props => props.theme.transparentBlack4};

    & :first-child {
      justify-self: flex-end;
      font-size: 2.3rem;
    }
    & :nth-child(2) {
      justify-self: flex-start;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 667px) {
    grid-template-columns: 2fr 1fr;

    & > div {
      display: none;
    }
  }
`;

export const Body = styled.div`
  & ${List} {
    width: 100%;

    & li:nth-child(even) {
      background: ${props => props.theme.transparent2};
      height: ${props => 8 * props.theme.unit + "px"};
    }
  }
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: ${props => 2 * props.theme.unit + "px"};
`;

export const ExtendedStyledListItem = styled(StyledListItem)`
  & button {
    background: ${props => props.theme.white};
    color: ${props => props.theme.black};
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    width: ${props => 10 * props.theme.unit + "px"};
    height: ${props => 5 * props.theme.unit + "px"};
  }

  padding: 0 ${props => 2 * props.theme.unit + "px"};
  @media (max-width: 320px) {
    width: 90%;
  }
`;

export const Button = styled.div`
  & * {
    text-decoration: none;
    color: ${props => props.theme.transparent4};
    margin-top: 8px;
  }
  font-size: 2.5rem;
  width: 100%;
  & :hover {
    & * {
      color: ${props => props.theme.transparentBlack3};
    }
  }
`;

export const CreateButton = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.5s;
  position: absolute;
  bottom: 5rem;
  right: 5rem;

  & :hover {
    color: ${props => props.theme.primary};
  }
  & > [type="circle"] {
    background-color: ${props => props.theme.transparentBlack3};
    width: 5rem;
    height: 5rem;
    position: absolute;
    border-radius: 100%;
  }
  & > [type="icon"] {
    font-size: 5rem;
    position: absolute;
  }
  @media (min-width: 668px) {
    display: none;
  }
`;
