// Dependencies
import React, { useEffect, useState } from "react";
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

const App = hot(module)(() => {
  const [breakpoint, setBreakpoint] = useState(theme.breakpoints.desktop);

  const handleResize = () => {
    const mobile = theme.breakpoints.mobile.substring(
      0,
      theme.breakpoints.mobile.length - 2
    );
    if (window.innerWidth < mobile) {
      setBreakpoint(theme.breakpoints.mobile);
    } else {
      setBreakpoint(theme.breakpoints.tablet);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => handleResize(), []);
  const {
    accessToken,
    login,
    logout,
    setAuthData,
    isAuthenticated
  } = useAuth();

  return (
    <ThemeProvider theme={theme}>
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
        <Route path="/roomsearch" component={RoomSearch} />

        <Route
          path="/room/:roomid"
          component={props => (
            <Room {...props} accessToken={accessToken}></Room>
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
