import React from "react";
import { Link } from "react-router-dom";

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

// process.env.NODE_ENV === "production"
//         ? "https://airplayer.herokuapp.com/auth/login"
//         : "http://localhost:8888/auth/login";

export default function Landing(props) {
  const { logout, isAuthenticated } = props;

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
          <Button>
            <img src={spotifyLogo} alt="" />
            <a
              href={
                process.env.NODE_ENV === "production"
                  ? "https://airplayer.herokuapp.com/auth/login"
                  : "http://localhost:8888/auth/login"
              }
            >
              Login With Spotify
            </a>
          </Button>
        )}
      </Body>
    </Background>
  );
}
