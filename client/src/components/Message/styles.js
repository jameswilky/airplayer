import styled from "styled-components";

export const Container = styled.div.attrs(props => ({
  opacity: props.active ? 1 : 0
}))`
  & div {
    position: absolute;
    bottom: ${props => 12 * props.theme.unit + "px"};
    height: ${props => 6 * props.theme.unit + "px"};
    width: 100%;
    opacity: ${props => props.opacity};
    transition: opacity 0.7s;
    text-align: center;
    padding: ${props => 1.5 * props.theme.unit + "px"};
  }
`;

export const Error = styled.div`
  background-color: ${props => props.theme.red};
`;
export const Success = styled.div`
  background-color: ${props => props.theme.green};
`;
