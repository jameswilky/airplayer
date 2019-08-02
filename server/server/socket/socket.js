const { getRoom, updateRoom } = require("../daos/roomDao");
const diff = require("../helpers/diff");
const isEmpty = require("../helpers/isEmpty");
const { ALL, HOST } = require("../actions/scopes");
const dispatch = require("../reducers/roomReducer");

const inARoom = socket => {
  // A socket always has 1 room attached as a room is naturally created on connection
  // So a socket should have 2 rooms if it has joined a user-created room
  return Object.keys(socket.rooms).length > 1;
};

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

    socket.on("CREATE_ROOM", async () => {
      // Create a room instance in the database
      // emit a room creation event that will send a token to the host
      //
    });

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
        if (inARoom(socket)) {
          handleEvent(event, data);
        } else {
          socket.emit(
            "ERROR",
            `${event} failed, can only be used inside a room`
          );
        }
      });
    });

    //Handles events that only hosts can use
    Object.keys(HOST).forEach(event => {
      socket.on(event, data => {
        if (inARoom(socket)) {
          if (socket.id === state.host.socketId) {
            handleEvent(event, data);
          } else {
            socket.emit("ERROR", `${event} failed, not authorized`);
          }
        } else {
          socket.emit(
            "ERROR",
            `${event} failed, can only be used inside a room`
          );
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
