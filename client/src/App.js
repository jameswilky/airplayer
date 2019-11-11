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

//Routes
import Landing from "./pages/Agnostic/Landing/Landing";
import Callback from "./pages/Agnostic/Callback";
import RoomSearch from "./pages/Agnostic/RoomSearch/RoomSearch";

//Reducers
import authReducer from "./reducers/authReducer";
// import RoomInterface from "./interfaces/Mobile/RoomInterface";
import Room from "./pages/Desktop/Room/Room";

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
        <Route exact path="/" component={Landing} />
        <Route path="/roomsearch" component={RoomSearch} />
        {/* <Route path="/room/:roomid" component={RoomInterface} /> */}
        <Route path="/room/:roomid" component={Room} />

        <Route path="/auth/callback" component={Callback} />
      </Router>
    </ThemeProvider>
  </Provider>
));

export default App;
