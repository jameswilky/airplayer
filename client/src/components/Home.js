import React from "react";
import { Link } from "react-router-dom";
import Auth from "../modules/Auth";
import { useSelector } from "react-redux";
import styled from "styled-components";

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
    color: ${props => props.theme.transparent4};
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

const Card = styled.div`
  display: grid;
  justify-items: center;
  width: 500px;
  max-height: 200px;
  grid-template-rows: 1fr 1fr;
  text-align: center;

  & p {
    font-size: 1.5rem;
  }

  & input {
    margin: 0px;
    background-color: ${props => props.theme.transparent4};
    padding: 20px;
    border: none;
    font-size: 1.2rem;
    border-radius: 5px;
    box-shadow: 4px 4px ${props => props.theme.gray};
    text-align: center;
    width: 300px;
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

  & button {
    background: ${props => props.theme.transparent2};
    width: 200px;
    height: 40px;
    margin: 0px;
    border: none;
    font-size: 1.5rem;
    & > * {
      text-decoration: none;
    }

    & > a:visited {
      color: inherit;
    }
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
        <p>Search for parties in your area</p>
      </Head>

      <Card>
        <div>
          <input type="text" placeholder="Enter your location" />
        </div>
        <button>
          {" "}
          <Link to="/roomsearch">Go!</Link>{" "}
        </button>
      </Card>
      <div style={{ position: "absolute", top: "5%" }}>
        <button onClick={logout}>Log out</button>
        <button onClick={login}>Log in</button>
      </div>
    </Background>
  );
}
