import styled from "styled-components";

export const Container = styled.div`
  & div {
    position: absolute;
    bottom: ${props => 12 * props.theme.unit + "px"};
    height: ${props => 6 * props.theme.unit + "px"};
    width: 100%;
    transition: opacity 0.7s;
    text-align: center;
    padding: ${props => 1.5 * props.theme.unit + "px"};
    pointer-events: none;
  }
`;

export const Error = styled.div`
  background-color: ${props => props.theme.red};
  opacity: ${props => (props.active ? 1 : 0)};
`;
export const Success = styled.div`
  background-color: ${props => props.theme.green};
  opacity: ${props => (props.active ? 1 : 0)};
`;
