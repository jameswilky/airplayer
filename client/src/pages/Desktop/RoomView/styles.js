import styled from "styled-components";

export const Background = styled.div`
  background: ${props =>
    props.theme.mode === "dark" ? props.theme.black : props.theme.gradient};
`;
export const Container = styled.div`
  display: grid;
  width: 100%;
  color: ${props => props.theme.white};
  grid-template-columns: ${props => 20 * props.theme.unit + "px"} 1fr;
  grid-template-rows:
    ${props => 6 * props.theme.unit + "px"} calc(100vh - 128px)
    ${props => 10 * props.theme.unit + "px"};
`;

export const Main = styled.main`
  max-height: calc(100vh - 128px);
  overflow: auto;
`;

export const Footer = styled.footer`
  grid-column: span 2;
  color: ${props => props.theme.white};
  height: 100%;
`;
