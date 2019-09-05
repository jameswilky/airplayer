import React from "react";
import Home from "./components/Home";
import { hot } from "react-hot-loader";

import RoomSearch from "./components/RoomSearch";
import MusicPlayerInterface from "./interfaces/MusicPlayerInterface";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Callback from "./components/Callback";

import authReducer from "./reducers/authReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Auth from "./modules/Auth";

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
      <Route path="/room/:roomid" component={MusicPlayerInterface} />
      <Route path="/auth/callback" component={Callback} />
    </Router>
  </Provider>
));

export default App;
