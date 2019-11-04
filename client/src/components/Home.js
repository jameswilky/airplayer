import React from "react";
import { Link } from "react-router-dom";
import Auth from "../modules/Auth";
import { useSelector } from "react-redux";
import styled from "styled-components";
import spotifyLogo from "../images/spotifyLogo.png";

const Background = styled.div`
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

const Head = styled.div`
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
const Body = styled.div`
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
const Submit = styled.button`
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

const Input = styled.input`
  margin: 0px;
  background-color: ${props => props.theme.transparent4};
  padding: 20px;
  border: none;
  font-size: 1.2rem;
  text-align: center;
  width: 300px;
`;
const ShadowWrapper = styled.div`
  box-shadow: 4px 4px ${props => props.theme.gray};
`;

const Button = styled.button`
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

export default function Home(props) {
  const { login, logout } = Auth;
  const auth = useSelector(state => state.auth);
  return (
    <Background>
      <Head>
        {" "}
        <h1>Airplayer</h1>
        <p>Connect to parties in your area</p>
      </Head>
      <Body>
        {auth.isAuthenticated ? (
          <>
            <ShadowWrapper>
              <Input type="text" placeholder="Enter your location..."></Input>
              <Submit>
                <Link to="/roomsearch">Go</Link>
              </Submit>
            </ShadowWrapper>

            <p onClick={logout}>or click here to logout</p>
          </>
        ) : (
          <Button onClick={login}>
            <img src={spotifyLogo} alt="" />
            <p>Login With Spotify</p>
          </Button>
        )}
      </Body>
    </Background>
  );
}
