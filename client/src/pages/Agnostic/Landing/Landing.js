import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import spotifyLogo from "../../../images/spotifyLogo.png";

import {
  Background,
  Head,
  Body,
  ShadowWrapper,
  Submit,
  Input,
  Button
} from "./styles";

export default function Landing(props) {
  const { login, logout, isAuthenticated } = useAuth();

  return (
    <Background>
      <Head>
        {" "}
        <h1>Airplayer</h1>
        <p>Connect to parties in your area</p>
      </Head>
      <Body>
        {isAuthenticated ? (
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
