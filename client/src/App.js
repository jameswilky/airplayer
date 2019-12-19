// Dependencies
import React, { useState } from "react";
import { hot } from "react-hot-loader"; // used to fix hot reload issues with styled components during development
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import auth from "./modules/Auth";

//Routes
import Landing from "./pages/Agnostic/Landing/Landing";
import Callback from "./pages/Agnostic/Callback";
import RoomSearch from "./pages/Agnostic/RoomSearch/RoomSearch";

//Reducers

import Room from "./pages/Agnostic/Room/Room";

import useAuth from "./hooks/useAuth";
//Styles
import "./global.css";
const prevAuthData = JSON.parse(localStorage.getItem("authData"));

auth.init();
// const App = hot(module)(() => { // For development, effects styled components
const App = () => {
  const activeTheme = localStorage.getItem("theme");
  const toggleTheme = () => {
    localStorage.setItem(
      "theme",
      activeTheme === "light" || activeTheme === null ? "dark" : "light"
    );
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
          component={props => <Landing {...props} auth={auth}></Landing>}
        />

        <Route
          path="/roomsearch"
          component={() => <RoomSearch auth={auth}></RoomSearch>}
        />

        <Route
          path="/room/:roomid"
          component={props => <Room {...props} auth={auth}></Room>}
        />

        <Route
          path="/auth/callback"
          component={props => <Callback {...props} auth={auth}></Callback>}
        />
      </Router>
    </ThemeProvider>
  );
};
//   );
// });

export default App;
