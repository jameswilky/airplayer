const { getRoom, updateRoom, createRoom } = require("../daos/roomDao");
const diff = require("../helpers/diff");
const isEmpty = require("../helpers/isEmpty");
const { ALL, HOST } = require("../actions/scopes");
const dispatch = require("../reducers/roomReducer");

// TODO refactor host actions to require a access token for each request

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
      currentSong: null
    };

    const host = { socketId: null };

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

    socket.on("CREATE_ROOM", async name => {
      // bind the socket id of the host to the room object
      // TODO Create a room instance in the database
      const nextState = await createRoom(name);
      if (!nextState) {
        socket.emit("ERROR", "room creation attempt failed");
      } else {
        Object.assign(host, { socketId: socket.id });
        Object.assign(state, nextState);
        const payload = { token: "test", roomId: state.id };
        socket.emit("ROOM_CREATED", payload);
      }
      // Once created, client should emit a join room request with the new room id
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
        // Authenticate a socket once then use socket id to check if it is a host
        const isAHost = socket.id === host.socketId;

        if (inARoom(socket)) {
          if (isAHost) {
            handleEvent(event, data);
          }
          // TODO on client side, make sure host will attempt a reconnect after reciving this error
          else {
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
