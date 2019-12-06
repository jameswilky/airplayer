import styled, { css } from "styled-components";
import { IoIosHome, IoIosSearch, IoIosList } from "react-icons/io";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: ${props => props.theme.white};
  text-decoration: none;
  display: grid;
  justify-self: flex-start;
  grid-template-columns: 2rem 1fr;
  grid-gap: ${props => 1 * props.theme.unit + "px"};
  cursor: pointer;
  color: ${props => props.theme.transparent4};

  &:hover {
    color: ${props => props.theme.white};
  }
  transition: color 0.4s;
`;
export const Container = styled.nav`
  grid-row: span 2;
  background-color: ${props => props.theme.transparent};
  display: grid;
  justify-content: center;
  grid-gap: ${props => 1 * props.theme.unit + "px"};
  align-content: flex-start;
  padding: ${props => 4 * props.theme.unit + "px"};

  & p {
    padding-top: 5px;
    font-size: 1.2rem;
  }
`;

const Icon = css`
  font-size: 2rem;
`;

export const HomeIcon = styled(IoIosHome)`
  ${Icon}
`;

export const SearchIcon = styled(IoIosSearch)`
  ${Icon}
`;

export const LibraryIcon = styled(IoIosList)`
  ${Icon}
`;
