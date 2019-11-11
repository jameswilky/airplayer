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
  min-width: 320px;
  width: 85vw;
  min-height: 400px;
  height: 85vh;
  background-color: ${props => props.theme.transparent2};
  grid-template-rows: 70px 1fr;
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
    padding: 15px;
  }
`;

export const Body = styled.div`
  & ${List} {
    width: 100%;

    & li:nth-child(even) {
      background: ${props => props.theme.transparent2};
      height: 80px;
    }
  }
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: 15px;
`;

export const ExtendedStyledListItem = styled(StyledListItem)`
  & button {
    background: ${props => props.theme.white};
    color: ${props => props.theme.black};
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    width: 90px;
    height: 30px;
  }
  padding: 0 15px;
`;
