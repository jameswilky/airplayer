const {
  getRoom,
  updateRoom,
  createRoom,
  passwordDoesMatch
} = require("../daos/roomDao");
const { createHost } = require("../daos/hostDao");
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
      currentSong: null
    };

    const host = { token: null };
    // Authentication is handled as follows:
    // On Room creation, the client sends their spotifyUserId, and then a token is created
    // This token is stored on the browser as a cookie and in the host schema
    // The Host schema associates the token with the spotify ID and the room id
    // When a host action is requested, the payload will be inspected to find a token property
    // If that token matches host.token, then its a valid action
    // If the token provided does not match host.token then the action can not be performed
    // The reason we are using authentication against the host value in Ram instead of validating the user
    // on each request with the database, is to take advantage of the speed of websockets and not cause
    // a delay for the users actions
    // The down side is, if the user deletes the token they wont be able to reconnect as host

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

    socket.on(
      "CREATE_ROOM",
      async ({ name, spotifyUserId, password = null }) => {
        const nextState = await createRoom({ name, password });
        if (!nextState) {
          socket.emit("ERROR", "room creation attempt failed");
        } else {
          const { token } = await createHost({
            spotifyUserId: spotifyUserId,
            roomId: nextState.roomId
          });
          // On Room Creation, we create a Host entry in the database
          // This will require a spotify user ID and will return a token that will be assigned to the host
          Object.assign(host, { token: token });
          Object.assign(state, nextState);

          const payload = { token: host.token, roomId: state.id };
          socket.emit("ROOM_CREATED", payload);
        }
        // Once created, client should emit a join room request with the new room id
      }
    );

    socket.on("JOIN_ROOM", async ({ id, password = null }) => {
      /**
       * @param {obj} room {id,name,playlist,subscribers,currentSong}
       */
      // todo add check to validate input is a room object
      const nextState = await getRoom(id);

      if (!nextState) {
        socket.emit("ERROR", `join attempt failed, room not found`);
        return;
      }
      const authorized = await passwordDoesMatch({
        roomId: nextState.id,
        password
      });
      if (authorized) {
        Object.assign(state, nextState);
        socket.join(state.id);
        io.in(state.id).emit("ROOM_UPDATED", state);
      } else {
        socket.emit("ERROR", `join attempt failed, invalid password`);
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
        if (!data || !data.hasOwnProperty("token")) {
          socket.emit(
            "ERROR",
            `${event} requires authorization, please provide a token.`
          );
          return;
        }
        const isAHost = data.token === host.token;

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

    if (interval && inARoom(socket)) {
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
