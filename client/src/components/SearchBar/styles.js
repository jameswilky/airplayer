import styled from "styled-components";

export const Wrapper = styled.div`
  padding-bottom: ${props => 16 * props.theme.unit + "px"};
`;
export const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.white};
  padding: ${props => 2 * props.theme.unit + "px"};
  position: fixed;
  background-color: ${props => props.theme.darkestGray};
  z-index: 10;
  & input {
    margin: 0px;
    background-color: ${props => props.theme.transparent};
    border: none;
    border-bottom: 1px solid ${props => props.theme.white};
    width: 100%;
    height: ${props => 8 * props.theme.unit + "px"};
    color: ${props => props.theme.white};
    font-size: 2rem;
    padding: ${props => 2 * props.theme.unit + "px"};
  }
`;
