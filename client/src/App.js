import React from "react";
import Home from "./components/Home";
import RoomSearch from "./components/RoomSearch";
import MusicPlayerInterface from "./interfaces/MusicPlayerInterface";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Callback from "./components/Callback";

import authReducer from "./reducers/authReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const INITIAL_STATE = { auth: "test" };
const store = createStore(authReducer, INITIAL_STATE);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/roomsearch" component={RoomSearch} />
        <Route path="/room1" component={MusicPlayerInterface} />
        <Route path="/auth/callback" component={Callback} />
      </Router>
    </Provider>
  );
}

export default App;
