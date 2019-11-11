import styled from "styled-components";

export const Background = styled.div`
  background: ${props => props.theme.gradient};
  height: 100vh;
  justify-content: center;
  justify-items: center;
  display: grid;
  grid-gap: 30px;
  padding-top: 15vh;
  grid-template-rows: 140px 1fr;
  color: ${props => props.theme.white};
`;

export const Head = styled.div`
  text-align: center;
  & > h1 {
    font-size: 5rem;
    text-shadow: 4px 4px ${props => props.theme.gray};
  }

  & > p {
    font-size: 1.5rem;
    padding-top: 10px;
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
    margin-top: 50px;
    color: ${props => props.theme.transparent5};
    cursor: pointer;
  }

  & > p:hover {
    color: ${props => props.theme.black};
  }
`;
export const Submit = styled.button`
  border: none;
  padding: 20px;
  font-size: 1.2rem;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.transparent1};
  & > * {
    text-decoration: none;
  }

  & > a:visited {
    color: inherit;
  }
`;

export const Input = styled.input`
  margin: 0px;
  background-color: ${props => props.theme.transparent4};
  padding: 20px;
  border: none;
  font-size: 1.2rem;
  text-align: center;
  width: 300px;
`;
export const ShadowWrapper = styled.div`
  box-shadow: 4px 4px ${props => props.theme.gray};
`;

export const Button = styled.button`
  background: ${props => props.theme.transparent3};
  margin: 0px;
  padding: 30px 50px;
  border-radius: 90px;
  border: none;
  font-size: 1.5rem;
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

  & > p {
    margin-top: 8px;
  }

  &:focus {
    outline: 0;
  }

  text-justify: center;
  & > img {
    width: 42px;
    margin-right: 10px;
  }
`;
