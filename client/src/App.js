// Dependencies
import React, { useState } from "react";
import { hot } from "react-hot-loader"; // used to fix hot reload issues with styled components during development
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

//Routes
import Landing from "./pages/Agnostic/Landing/Landing";
import Callback from "./pages/Agnostic/Callback";
import RoomSearch from "./pages/Agnostic/RoomSearch/RoomSearch";

//Reducers

import Room from "./pages/Agnostic/Room/Room";

import useAuth from "./hooks/useAuth";
//Styles
import "./global.css";
import { StyledItem } from "./components/Carousel/styles";
const prevAuthData = JSON.parse(localStorage.getItem("authData"));

const App = hot(module)(() => {
  const { accessToken, login, logout, setAuthData, isAuthenticated } = useAuth(
    prevAuthData
  );

  const activeTheme = localStorage.getItem("theme");
  const toggleTheme = () => {
    localStorage.setItem("theme", activeTheme === "light" ? "dark" : "light");
    window.location.reload();
  };

  return (
    <ThemeProvider
      theme={
        activeTheme === "light" || activeTheme === null
          ? theme
          : { ...theme, mode: "dark" }
      }
    >
      <Router>
        <Route
          exact
          path="/"
          component={props => (
            <Landing
              {...props}
              login={login}
              logout={logout}
              accessToken={accessToken}
              isAuthenticated={isAuthenticated}
            ></Landing>
          )}
        />
        <Route
          path="/roomsearch"
          component={props => (
            <RoomSearch accessToken={accessToken}></RoomSearch>
          )}
        />

        <Route
          path="/room/:roomid"
          component={props => (
            <Room
              {...props}
              toggleTheme={toggleTheme}
              accessToken={accessToken}
            ></Room>
          )}
        />

        <Route
          path="/auth/callback"
          component={props => (
            <Callback {...props} setAuthData={setAuthData}></Callback>
          )}
        />
      </Router>
    </ThemeProvider>
  );
});

export default App;
