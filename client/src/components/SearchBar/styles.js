import styled from "styled-components";

export const Wrapper = styled.div`
  padding-bottom: ${props => 20 * props.theme.unit + "px"};
  background-color: ${props => props.theme.white};
`;
export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: ${props => 2 * props.theme.unit + "px"};
  border-bottom: 1px solid ${props => props.theme.white};
  padding: ${props => 2 * props.theme.unit + "px"};
  position: fixed;
  background-color: ${props => props.theme.darkestGray};
  background-image: ${props =>
    props.theme.mode === "light" && props.theme.gradient};
  z-index: 10;
  & input {
    margin: 0px;
    background-color: ${props => props.theme.transparent};
    border: none;
    border-bottom: 1px solid ${props => props.theme.white};
    width: 100%;
    height: ${props => 8 * props.theme.unit + "px"};
    color: ${props => props.theme.white};
    font-size: 1.75rem;
    padding: ${props => 2 * props.theme.unit + "px"};

    &::placeholder {
      color: ${props => props.theme.transparent4};
    }
  }
`;
