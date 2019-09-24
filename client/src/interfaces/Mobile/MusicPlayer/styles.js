import styled from "styled-components";

export const StyledList = styled.ul`
  background-color: black;
  padding: 20px 20px 50px 20px;
`;

export const StyledItem = styled.li`
  font-size: 0.8rem;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  padding-bottom: 15px;
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
      color: rgba(255, 255, 255, 0.7);
      font-weight: 100;
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
