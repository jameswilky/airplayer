import styled from "styled-components";

export const StyledList = styled.ul`
  display: flex;
  padding: 20px;
`;

export const StyledContainer = styled.div`
  height: ${props => props.height};
  overflow: scroll;

  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;
export const StyledItem = styled.li`
  list-style: none;
  padding-right: 20px;
  & * {
    padding: 2px;
  }
  & img {
    width: 128px;
    height: 128px;
  }
  font-size: 0.8rem;
  & p {
    display: inline;
    color: rgba(255, 255, 255, 0.6);
    text-transform: capitalize;
  }
`;

export const StyledItemContainer = styled.span`
  position: relative;
`;

export const StyledPlayButton = styled.div`
  border: 2px solid transparent;
  border-radius: 90px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 48px;
  width: 48px;
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
  height: 128px;
  width: 128px;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    content: "";
    cursor: pointer;
  }
`;
