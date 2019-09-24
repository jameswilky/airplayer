// Dependencies
import React from "react";
import { hot } from "react-hot-loader"; // used to fix hot reload issues with styled components during development
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

//Modules
import Auth from "./modules/Auth";

//Components
import Home from "./components/Home";
import Callback from "./components/Callback";
import RoomSearch from "./components/RoomSearch";

//Reducers
import authReducer from "./reducers/authReducer";
import RoomInterface from "./interfaces/Mobile/RoomInterface";
import DesktopRoomInterface from "./interfaces/Desktop/DesktopRoomInterface";

//Styles
import "./global.css";

const INITIAL_STATE = {
  auth: {
    refreshToken: Auth.getRefreshToken(),
    accessToken: Auth.getAccessToken(),
    isAuthenticated: Auth.isAuthenticated()
  }
};
const store = createStore(authReducer, INITIAL_STATE);
const App = hot(module)(() => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/roomsearch" component={RoomSearch} />
        {/* <Route path="/room/:roomid" component={RoomInterface} /> */}
        <Route path="/room/:roomid" component={DesktopRoomInterface} />

        <Route path="/auth/callback" component={Callback} />
      </Router>
    </ThemeProvider>
  </Provider>
));

export default App;
