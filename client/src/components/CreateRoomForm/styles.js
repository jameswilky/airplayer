import styled from "styled-components";

export const Container = styled.div`
  color: ${props => props.theme.black};
  text-align: center;
`;

export const Form = styled.form`
  & > p {
    color: ${props => props.theme.transparentBlack};
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
    color: ${props => props.theme.primary};
  }

  & > button {
    display: block;
    margin: ${props => 2 * props.theme.unit + "px"} auto;
    color: ${props => props.theme.white};
    padding: 8px 32px;
    background: ${props => props.theme.primary};
    border-radius: 1rem;
    font-size: 1.5rem;
    box-shadow: 2px 2px
      ${props =>
        props.theme.mode === "dark"
          ? props.theme.transparent
          : props.theme.transparentBlack5};

    border: none;
  }
`;
