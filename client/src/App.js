// Dependencies
import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader"; // used to fix hot reload issues with styled components during development
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

//Routes
import Landing from "./pages/Agnostic/Landing/Landing";
import Callback from "./pages/Agnostic/Callback";
import RoomSearch from "./pages/Agnostic/RoomSearch/RoomSearch";

//Reducers
import authReducer from "./reducers/authReducer";
import MobileRoom from "./pages/Mobile/Room/Room";
import DesktopRoom from "./pages/Desktop/Room/Room";

//Styles
import "./global.css";

// Refactor authentication into a hook instead of using redux
const INITIAL_STATE = {
  auth: {
    refreshToken: null,
    accessToken: null,
    isAuthenticated: false
  }
};
const store = createStore(authReducer, INITIAL_STATE);
const App = hot(module)(() => {
  const [breakpoint, setBreakpoint] = useState(theme.breakpoints.mobile);

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

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route path="/roomsearch" component={RoomSearch} />

          <Route
            path="/room/:roomid"
            component={
              breakpoint === theme.breakpoints.mobile ? MobileRoom : DesktopRoom
            }
          />

          <Route path="/auth/callback" component={Callback} />
        </Router>
      </ThemeProvider>
    </Provider>
  );
});

export default App;
