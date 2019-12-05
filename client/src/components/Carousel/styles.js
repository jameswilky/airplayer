import styled, { css } from "styled-components";
import { IoIosAdd, IoIosCheckmark } from "react-icons/io";

export const TickIcon = styled(IoIosCheckmark)`
  position: absolute;
  font-size: 2.5rem;
  &:hover {
    color: ${props => props.theme.transparent4};
  }
  color: ${props => props.theme.green};
`;
export const AddIcon = styled(IoIosAdd)`
  position: absolute;
  font-size: 2.5rem;
  &:hover {
    color: ${props => props.theme.transparent4};
  }
  color: ${props => props.theme.white};
`;

export const IconUnderlay = styled.div`
  border: 1px solid transparent;
  border-radius: 90px;
  background-color: ${props => props.theme.transparentBlack};

  height: ${props => 6 * props.theme.unit + "px"};
  width: ${props => 6 * props.theme.unit + "px"};
  position: relative;
`;

export const StyledList = styled.ul`
  display: flex;
  overflow-y: hidden;

  padding: 0 ${props => 2 * props.theme.unit + "px"};
`;

export const StyledContainer = styled.div`
  height: ${props => 25 * props.theme.unit + "px"};
  overflow-x: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;
export const StyledItem = styled.li`
  list-style: none;
  padding-right: ${props => 2 * props.theme.unit + "px"};
  & * {
    padding: ${props => 0.25 * props.theme.unit + "px"};
  }
  & img {
    width: ${props => 16 * props.theme.unit + "px"};
    height: ${props => 16 * props.theme.unit + "px"};
  }
  font-size: 0.8rem;
  & p {
    display: inline;
    color: ${props =>
      props.theme.mode === "dark"
        ? props.theme.transparent4
        : props.theme.transparentBlack};
    text-transform: capitalize;
  }
`;

export const StyledItemContainer = styled.span`
  position: relative;
`;

export const StyledPlayButton = styled.div`
  border: 1px solid transparent;
  border-radius: 90px;
  background-color: ${props => props.theme.transparentBlack};

  height: ${props => 6 * props.theme.unit + "px"};
  width: ${props => 6 * props.theme.unit + "px"};
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -6px;
    margin-top: -12px;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 16px solid white;
  }
`;
export const StyledOverlay = styled.div`
  position: absolute;
  top: 0px;
  height: ${props => 16 * props.theme.unit + "px"};
  width: ${props => 16 * props.theme.unit + "px"};
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    content: "";
    cursor: pointer;
  }
`;
