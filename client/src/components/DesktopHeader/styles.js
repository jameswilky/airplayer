import styled from "styled-components";
import { IoIosPerson } from "react-icons/io";

export const ProfileIcon = styled(IoIosPerson)`
  border: 2px solid ${props => props.theme.transparent4};
  border-radius: 90px;
  width: ${props => 4 * props.theme.unit + "px"};
  height: ${props => 4 * props.theme.unit + "px"};

  cursor: pointer;
  color: ${props => props.theme.transparent4};

  &:hover {
    color: ${props => props.theme.white};
  }
`;
export const Container = styled.header`
  padding: ${props => 2 * props.theme.unit + "px"};
  grid-template-columns: 2fr 1fr;
  display: grid;
  justify-items: flex-end;
  align-content: center;
`;

export const Wrapper = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  justify-self: flex-start;
  grid-gap: ${props => 1 * props.theme.unit + "px"};
`;

export const SearchBar = styled.input`
  padding: ${props => 1 * props.theme.unit + "px"};

  border-radius: 2px;
  background-color: ${props => props.theme.transparent4};
  border: none;
  display: block;
  justify-self: start;
  width: ${props => 34 * props.theme.unit + "px"};
`;
