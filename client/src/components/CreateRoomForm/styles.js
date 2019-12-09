import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  color: ${props =>
    props.theme.mode === "dark" ? props.theme.white : props.theme.black};
`;

export const SearchForm = styled.div`
  overflow: hidden !important;
  display: grid;
  grid-gap: 24px;
  height: 100%;

  & [type="container"] {
    position: relative;

    & input {
      justify-self: center;
      width: 70%;
      max-width: 500px;
      padding: ${props => 2 * props.theme.unit + "px"};
    }

    & [type="icon"] {
      position: absolute;
      font-size: 2rem;
      top: 8px;
      margin-left: -40px;

      color: ${props =>
        props.theme.mode === "dark" ? props.theme.white : props.theme.black};
    }
  }
`;
export const CreateForm = styled.form`
  & > p {
    color: ${props =>
      props.theme.mode === "dark"
        ? props.theme.white
        : props.theme.transparentBlack};
  }

  & > input {
    margin: ${props => 1.5 * props.theme.unit + "px"} 0;
    width: 300px;
    border: none;
    padding: ${props => 1.5 * props.theme.unit + "px"};
    box-shadow: 2px 2px
      ${props =>
        props.theme.mode === "dark"
          ? props.theme.transparent
          : props.theme.transparentBlack5};
  }

  & > [type="icon"] {
    position: absolute;
    font-size: 2rem;
    margin-left: -340px;
    margin-top: 16px;
    color: ${props =>
      props.theme.mode === "dark" ? props.theme.white : props.theme.primary};
  }
`;
export const CreateButton = styled.button`
  display: block;
  margin: ${props => 2 * props.theme.unit + "px"} auto;
  color: ${props =>
    props.theme.mode === "dark" ? props.theme.black : props.theme.white};
  padding: 8px 32px;
  background: ${props =>
    props.theme.mode === "dark"
      ? props.theme.transparent3
      : props.theme.primary};
  border-radius: 1rem;
  font-size: 1.5rem;
  box-shadow: 2px 2px
    ${props =>
      props.theme.mode === "dark"
        ? props.theme.transparent
        : props.theme.transparentBlack5};

  border: none;
  cursor: pointer;
`;
