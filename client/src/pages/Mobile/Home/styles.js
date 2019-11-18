import styled from "styled-components";

export const StyledList = styled.ul`
  background-color: ${props =>
    props.theme.mode === "dark" ? props.theme.black : props.theme.white};

  background-image: ${props => props.theme.gradient};
  padding: ${props => 1 * props.theme.unit + "px"};
`;

export const StyledItem = styled.li`
  font-size: 0.8rem;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  padding-bottom: ${props => 2 * props.theme.unit + "px"};
  align-items: center;
  width: 100%;
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
      color: ${props => props.theme.transparent4};
      font-weight: 100;
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
