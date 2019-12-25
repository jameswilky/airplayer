import styled from "styled-components";

export const Background = styled.div`
  background: ${props =>
    props.theme.mode === "dark" ? props.theme.black : props.theme.gradient};
  height: 100vh;
  justify-content: center;
  justify-items: center;
  display: grid;
  grid-gap: ${props => 2 * props.theme.unit + "px"};
  padding-top: 15vh;
  grid-template-rows: ${props => 12 * props.theme.unit + "px"} 1fr;
  color: ${props => props.theme.white};
`;

export const Head = styled.div`
  text-align: center;
  & > h1 {
    font-size: 3.9rem;
    text-shadow: 3px 3px
      ${props =>
        props.theme.mode === "dark"
          ? props.theme.transparent
          : props.theme.transparentBlack5};
    background: ${props =>
      props.theme.mode === "dark" ? props.theme.gradient : "none"};
    -webkit-background-clip: ${props =>
      props.theme.mode === "dark" ? "text" : "none"};
    background-clip: ${props =>
      props.theme.mode === "dark" ? "text" : "none"};
    -webkit-text-fill-color: ${props =>
      props.theme.mode === "dark" ? "transparent" : "none"};
  }

  & > p {
    font-size: 1rem;
    padding-top: ${props => 1 * props.theme.unit + "px"};
    color: ${props => props.theme.transparent5};
  }
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
export const Body = styled.div`
  animation: fadeIn 1s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  text-align: center;

  & > p {
    margin-top: ${props => 4 * props.theme.unit + "px"};
    color: ${props => props.theme.transparent5};
    cursor: pointer;
  }

  & > p:hover {
    color: ${props =>
      props.theme.mode === "dark" ? props.theme.primary : props.theme.black};
  }
`;
export const Submit = styled.button`
  border: none;
  padding: ${props => 2 * props.theme.unit + "px"};
  font-size: 1rem;
  color: ${props => props.theme.white};
  background-color: ${props =>
    props.theme.mode === "dark"
      ? props.theme.transparent
      : props.theme.transparent3};
  & > * {
    text-decoration: none;
  }

  & > a:visited {
    color: inherit;
  }
`;

export const Input = styled.input`
  color: ${props =>
    props.theme.mode === "dark" ? props.theme.primary : props.theme.white};
  margin: 0px;
  background-color: ${props =>
    props.theme.mode === "dark"
      ? props.theme.transparent2
      : props.theme.transparent4};
  padding: ${props => 2 * props.theme.unit + "px"};
  border: none;
  font-size: 0.8rem;
  text-align: center;
  width: ${props => 26 * props.theme.unit + "px"};
  height: 50px;
`;
export const ShadowWrapper = styled.div`
  box-shadow: 4px 4px
    ${props =>
      props.theme.mode === "dark" ? props.theme.transparent : props.theme.gray};
`;

export const Button = styled.button`
  background: ${props => props.theme.transparent3};
  margin: 0px;
  padding: ${props => 1 * props.theme.unit + "px"};

  border-radius: 90px;
  border: none;
  font-size: 0.9rem;
  display: flex;
  cursor: pointer;
  color: ${props => props.theme.black};

  &:hover {
    background-color: ${props => props.theme.white};
  }
  & > * {
    text-decoration: none;
  }

  & > a:visited {
    color: inherit;
  }

  & > a {
    margin-top: ${props => 1 * props.theme.unit + "px"};
  }

  &:focus {
    outline: 0;
  }

  text-justify: center;
  & > img {
    width: 35px;
    margin-right: 10px;
  }
`;
