const { getRoom, updateRoom } = require("../daos/roomDao");
const diff = require("../helpers/diff");
const isEmpty = require("../helpers/isEmpty");
const setState = require("../helpers/setState");
const events = require("../actions/actions");
const dispatch = require("../reducers/roomReducer");

module.exports = function(io, interval) {
  io.on("connection", function(socket) {
    const state = {};

    socket.on("JOIN_ROOM", async room => {
      /**
       * @param {obj} room {id,name,playlist,subscribers,currentSong}
       */
      const nextState = await getRoom(room.id);
      console.log(nextState);
      if (!nextState) {
        socket.emit("ERROR", `join attempt failed, room not found`);
      } else {
        setState(state, nextState);

        socket.join(state.id);
        io.in(state.id).emit("ROOM_UPDATED", state);
      }
    });

    Object.keys(events).forEach(event => {
      socket.on(event, data => {
        // Update state based on event type
        const nextState = dispatch(state, {
          type: event,
          payload: data
        });
        setState(state, nextState);
        // After each update, send updated room to each socket in room
        io.in(state.id).emit("ROOM_UPDATED", state);
      });
    });

    let prevState = {};
    setInterval(async () => {
      // Every X seconds check if state has changed.
      // If it has, sync socket state with database and update all clients
      if (!isEmpty(diff(state, prevState))) {
        const room = await updateRoom(state);
        if (!room) console.log("Error Updating Room");
        else {
          setState(state, room);
          setState(prevState, state);
          io.in(state.id).emit("ROOM_UPDATED", state);
        }
      }
    }, interval);
  });
};

/* 
socket io cheat sheet

https://socket.io/docs/emit-cheatsheet/
*/
