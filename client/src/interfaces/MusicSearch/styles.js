import styled from "styled-components";
import { Container } from "../../globalStyles";

export const StyledContainer = styled(Container)``;

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
