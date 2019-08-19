import React from "react";
import Home from "./components/Home";
import RoomSearch from "./components/RoomSearch";
import Room from "./components/Room";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/roomsearch" component={RoomSearch} />
      <Route path="/room1" component={Room} />
    </Router>
  );
}

export default App;
