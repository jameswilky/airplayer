// Dependencies
import React from "react";
import { hot } from "react-hot-loader"; // used to fix hot reload issues with styled components during development
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Modules
import Auth from "./modules/Auth";

//Components
import Home from "./components/Home";
import Callback from "./components/Callback";
import RoomSearch from "./components/RoomSearch";

//Reducers
import authReducer from "./reducers/authReducer";
import RoomInterface from "./interfaces/RoomInterface";

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
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/roomsearch" component={RoomSearch} />
      <Route path="/room/:roomid" component={RoomInterface} />

      <Route path="/auth/callback" component={Callback} />
    </Router>
  </Provider>
));

export default App;
