const { getRoom, updateRoom } = require("../daos/roomDao");
const diff = require("../helpers/diff");
const isEmpty = require("../helpers/isEmpty");
const { ALL, HOST } = require("../actions/scopes");
const dispatch = require("../reducers/roomReducer");

module.exports = function(io, interval = null) {
  io.on("connection", function(socket) {
    const state = {
      name: null,
      id: null,
      playlist: [],
      currentSong: null,
      host: { socketId: null }
    };

    const handleEvent = (event, data) => {
      // Update state based on event type
      const nextState = dispatch(state, {
        type: event,
        payload: data
      });
      Object.assign(state, nextState);
      // After each update, send updated room to each socket in room
      io.in(state.id).emit("ROOM_UPDATED", state);
    };

    socket.on("JOIN_ROOM", async id => {
      /**
       * @param {obj} room {id,name,playlist,subscribers,currentSong}
       */
      // todo add check to validate input is a room object
      const nextState = await getRoom(id);
      if (!nextState) {
        socket.emit("ERROR", `join attempt failed, room not found`);
      } else {
        Object.assign(state, nextState);

        socket.join(state.id);
        io.in(state.id).emit("ROOM_UPDATED", state);
      }
    });

    // Handles events that Clients and Hosts can use
    Object.keys(ALL).forEach(event => {
      socket.on(event, data => {
        handleEvent(event, data);
      });
    });

    // Handles events that only hosts can use
    Object.keys(HOST).forEach(event => {
      socket.on(event, data => {
        if (socket.id === state.host.socketId) {
          handleEvent(event, data);
        } else {
          socket.emit("ERROR", `${event} failed, Not Authorized`);
        }
      });
    });

    if (interval) {
      let prevState = {};
      setInterval(async () => {
        // Every X seconds check if state has changed.
        // If it has, sync socket state with database and update all clients
        if (!isEmpty(diff(state, prevState))) {
          const room = await updateRoom(state);
          if (!room) console.log("Error Updating Room");
          else {
            Object.assign(state, room);
            Object.assign(prevState, state);
            io.in(state.id).emit("ROOM_UPDATED", state);
          }
        }
      }, interval);
    }
  });
};

/* 
socket io cheat sheet

https://socket.io/docs/emit-cheatsheet/
*/
