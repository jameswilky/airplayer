import styled from "styled-components";

export const StyledContainer = styled.div`
  height: calc(100vh - 50px);
  position: relative;
`;
export const StyledSearchResults = styled.div`
  padding: 150px 10px 50px 10px;
  background-color: black;
  font-size: 1rem;
`;

export const StyledResult = styled.div`
  & ul {
    padding-top: 10px;
    & li {
      list-style: none;
      padding-left: 5px;
    }
  }
`;

export const StyledResultItem = styled.div`
  font-size: 0.8rem;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  padding: 0 0 20px 0;
  align-items: center;
  width: 100%;
  & img {
    height: 48px;
    width: 48px;
  }
  & span {
    padding: 0 3px;
  }
  & div {
    padding: 0 0 0 10px;
  }
  & h3 {
    font-size: 0.8rem;
  }
  & p {
    display: inline;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 100;
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
`;
export const StyledSearchFilterContainer = styled.div`
  font-size: 0.5em;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
export const StyledButton = styled.div`
  border: 1px solid grey;
  border-radius: 90px;
  padding: 8px;
  color: ${props => (props.active ? "black" : "white")};
  background-color: ${props => (props.active ? "white" : "black")};
`;

export const StyledSearchBar = styled.div`
  width: 100%;
  border-bottom: 2px solid whitesmoke;
  padding: 15px;
  position: fixed;
  background-color: black;
  & input {
    margin: 0px;
    background-color: black;
    border: none;
    border-bottom: 2px solid white;
    width: 100%;
    height: 60px;
    color: whitesmoke;
    font-size: 2rem;
    padding: 5px;
  }
`;

// TODO make global
export const StyledChevron = styled.span`
  opacity: 0.7;
  position: absolute;
  right: 23px;
  margin-top: -19px;
  &:before {
    border-style: solid;
    border-width: 1px 1px 0 0;
    content: "";
    display: inline-block;
    height: 12px;
    left: 0;
    position: relative;
    vertical-align: top;
    width: 12px;
    transform: rotate(45deg);
    visibility: ${props => props.visibility};
  }
`;
