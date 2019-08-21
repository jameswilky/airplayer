import React from "react";
import Home from "./components/Home";
import RoomSearch from "./components/RoomSearch";
import MusicPlayerInterface from "./interfaces/MusicPlayerInterface";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/roomsearch" component={RoomSearch} />
      <Route path="/room1" component={MusicPlayerInterface} />
    </Router>
  );
}

export default App;
