import styled from "styled-components";

export const Background = styled.div`
  background: ${props => props.theme.gradient};
`;
export const Container = styled.div`
  display: grid;
  width: 100%;
  color: ${props => props.theme.white};
  grid-template-columns: ${props => 16 * props.theme.unit + "px"} 1fr;
  grid-template-rows:
    ${props => 6 * props.theme.unit + "px"} calc(100vh - 128px)
    ${props => 8 * props.theme.unit + "px"};
`;

export const Sidebar = styled.nav`
  grid-row: span 2;
  padding: ${props => 1 * props.theme.unit + "px"};
  background-color: ${props => props.theme.transparent};
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

export const Header = styled.header`
  padding: ${props => 2 * props.theme.unit + "px"};
  grid-template-columns: 1fr 1fr;
  display: grid;
  justify-items: flex-end;
  align-content: center;
`;

export const DesktopSearchBar = styled.input`
  padding: ${props => 1 * props.theme.unit + "px"};

  border-radius: 2px;
  background-color: ${props => props.theme.transparent4};
  border: none;
  display: block;
  justify-self: start;
  width: ${props => 30 * props.theme.unit + "px"};
`;
