import styled from "styled-components";

export const Container = styled.div`
  background-color: ${props => props.theme.white};
  border-radius: ${props => (props.show ? "0" : "2rem")};
  width: ${props => (props.show ? "100%" : "0%")};
  height: ${props => (props.show ? "100%" : "0%")};
  bottom: ${props => (props.show ? "0" : "2.5rem")};
  right: ${props => (props.show ? "0" : "2.5rem")};
  position: absolute;
  overflow: hidden;
  box-shadow: 2px 3px ${props => props.theme.transparentBlack5};

  transition: width 0.5s, height 0.5s, bottom 0.5s, right 0.5s;
  & > * {
    opacity: ${props => (props.show ? "1" : "0")};

    transition: opacity 0.5s;
    color: ${props => props.theme.black};
  }

  & > [type="icon"] {
    color: ${props => props.theme.transparentBlack5};

    font-size: 3rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    & :hover {
      color: ${props => props.theme.black};
    }
  }
`;

export const Title = styled.p`
  text-align: center;
  padding: 1rem;
  font-size: 2rem;
`;
export const Body = styled.div`
  width: 90%;
  height: 75%;
  margin: 0 5%;
`;
