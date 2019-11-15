import StyledListItem from "../../../styles/StyledListItem";
import styled from "styled-components";
import List from "../../../components/List";

export const Background = styled.div`
  background: ${props => props.theme.gradient};
  height: 100vh;
  justify-content: center;
  justify-items: center;
  align-items: center;
  display: grid;
  color: ${props => props.theme.black};
`;

export const Container = styled.div`
  display: grid;
  justify-items: center;
  min-width: ${props => 40 * props.theme.unit + "px"};
  width: 85vw;
  min-height: ${props => 50 * props.theme.unit + "px"};
  height: 85vh;
  background-color: ${props => props.theme.transparent2};
  grid-template-rows: ${props => 8 * props.theme.unit + "px"} 1fr;
  grid-template-columns: 1fr;
  animation: fadeIn 1s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
export const Head = styled.div`
  display: grid;
  width: 100%;

  grid-template-columns: 2fr 1fr;

  & > input {
    padding: ${props => 1 * props.theme.unit + "px"};
  }
`;

export const Body = styled.div`
  & ${List} {
    width: 100%;

    & li:nth-child(even) {
      background: ${props => props.theme.transparent2};
      height: ${props => 8 * props.theme.unit + "px"};
    }
  }
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: ${props => 2 * props.theme.unit + "px"};
`;

export const ExtendedStyledListItem = styled(StyledListItem)`
  & button {
    background: ${props => props.theme.white};
    color: ${props => props.theme.black};
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    width: ${props => 10 * props.theme.unit + "px"};
    height: ${props => 5 * props.theme.unit + "px"};
  }
  padding: 0 ${props => 2 * props.theme.unit + "px"};
`;
