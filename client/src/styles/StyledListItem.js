import styled from "styled-components";

export default styled.li`
  background-color: ${props => (props.filter ? props.theme.transparent2 : "")};
  font-size: 0.8rem;
  display: grid;
  grid-template-columns: 48px 1fr ${props => (props.button ? "100px" : "48px")};
  margin-bottom: 15px;
  align-items: center;
  width: 100%;

  & img {
    height: 48px;
    width: 48px;
  }
  & div {
    padding: 0 0 0 10px;
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
    height: 48px;
    width: 48px;
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
