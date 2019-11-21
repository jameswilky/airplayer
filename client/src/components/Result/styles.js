import styled from "styled-components";
import { Chevron } from "../../styles/Chevron";

export const Container = styled.div`
  font-size: 1rem;
  padding: 0 ${props => 2 * props.theme.unit + "px"};

  & h2 {
    cursor: pointer;
  }
`;

export const StyledList = styled.ul`
  font-size: 1rem;
  padding-top: ${props => 2 * props.theme.unit + "px"};
  & li {
    list-style: none;
    background-color: ${props =>
      props.theme.mode === "dark" ? "" : props.theme.transparent3};
  }
`;

export const StyledChevron = styled(Chevron)`
  right: ${props => 3 * props.theme.unit + "px"};
  margin-top: ${props =>
    props.direction === "right"
      ? -2.5 * props.theme.unit + "px"
      : -3 * props.theme.unit + "px"};
  transform: ${props =>
    props.direction === "right" ? "rotate(0deg)" : "rotate(180deg)"};

  transition: transform 0.2s, margin-top 0.2s;
  color: ${props =>
    props.theme.mode === "dark" ? props.theme.white : props.theme.primary};
`;
