const {
  getRoom,
  updateRoom,
  createRoom,
  passwordDoesMatch
} = require("../daos/roomDao");
const { createHost } = require("../daos/hostDao");

const { ALL, HOST } = require("../actions/scopes");
const dispatch = require("../reducers/roomReducer");
const validateEvent = require("../middleware/validateEvent");

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
      // Temp
      currentSong: {
        playing: false,
        uri: "spotify:track:2W2eaLVKv9NObcLXlYRZZo"
      }
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
      // console.log("attempted", event, "payload :", data);
      const error = validateEvent(state, { type: event, payload: data });
      if (error) {
        socket.emit("ERROR", {
          type: event,
          payload: data,
          message: error,
          code: 400
        });
      } else {
        const nextState = dispatch(state, {
          type: event,
          payload: data
        });
        Object.assign(state, nextState);
        // After each update, send updated room to each socket in room
        io.in(state.id).emit("ROOM_UPDATED", state);
        socket.emit("SUCCESS", { type: event, payload: data });
        updateRoom(state);
      }
    };

    socket.on("CREATE_ROOM", async ({ name, userId, password = null }) => {
      const nextState = await createRoom({ name, password });
      if (!nextState) {
        socket.emit("ERROR", {
          type: "CREATE_ROOM",
          payload: { userId, name },
          message: "room creation attempt failed",
          code: 502
        });
      } else {
        const { token } = await createHost({
          spotifyUserId: userId,
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
    });

    socket.on("JOIN_ROOM", async ({ id, password = null, userId = null }) => {
      /**
       * @param {obj} room {id,name,playlist,subscribers,currentSong}
       */
      // todo add check to validate input is a room object

      const nextState = await getRoom(id);
      if (!nextState) {
        socket.emit("ERROR", {
          type: "JOIN_ROOM",
          payload: { id, userId },
          message: `join attempt failed, room not found`,
          code: 404
        });
        return;
      }
      const authorized = await passwordDoesMatch({
        roomId: nextState.id,
        password
      });
      if (authorized) {
        if (userId) {
          nextState.subscribers.push({ userId });
        }
        Object.assign(state, nextState);
        socket.join(state.id);
        io.in(state.id).emit("ROOM_UPDATED", state);
      } else {
        socket.emit("ERROR", {
          type: "JOIN_ROOM",
          payload: { id, userId },
          message: `join attempt failed, invalid password`,
          code: 403
        });
      }
    });

    // Handles events that Clients and Hosts can use
    Object.keys(ALL).forEach(event => {
      socket.on(event, data => {
        if (inARoom(socket)) {
          handleEvent(event, data);
        } else {
          socket.emit("ERROR", {
            type: event,
            payload: data,
            message: `${event} failed, can only be used inside a room`,
            code: 405
          });
        }
      });
    });

    //Handles events that only hosts can use
    Object.keys(HOST).forEach(event => {
      socket.on(event, data => {
        // TODO un comment this after to get authentication working
        // if (!data || !data.hasOwnProperty("token")) {
        //   socket.emit(
        //     "ERROR",
        //     `${event} requires authorization, please provide a token.`
        //   );
        //   return;
        // }
        // const isAHost = data.token === host.token;
        const isAHost = true;
        if (inARoom(socket)) {
          if (isAHost) {
            handleEvent(event, data);
          }
          // TODO on client side, make sure host will attempt a reconnect after reciving this error
          else {
            socket.emit("ERROR", {
              type: event,
              payload: data,
              message: `${event} failed, not authorized`,
              code: 401
            });
          }
        } else {
          socket.emit("ERROR", {
            type: event,
            payload: data,
            message: `${event} failed, can only be used inside a room`,
            code: 405
          });
        }
      });
    });

    // if (interval /*&& inARoom(socket)*/) {
    //   const prevState = { ...state };
    //   setInterval(async () => {
    //     if (inARoom(socket)) {
    //       // Every *interval* seconds check if state has changed.
    //       // If it has, sync socket state with database and update all clients
    //       // if (
    //       //   // Compare previous and next state, but dont compare passwords
    //       //   !isEmpty(
    //       //     diff(
    //       //       { ...state, password: null },
    //       //       { ...prevState, password: null }
    //       //     )
    //       //   )
    //       // ) {

    //       // TODO fix diffing
    //       const room = await updateRoom(state);
    //       if (!room) return;
    //       else {
    //         Object.assign(state, room);
    //         Object.assign(prevState, state);
    //         io.in(state.id).emit("ROOM_UPDATED", state);
    //         // console.log("Room Updated");
    //       }
    //       //}
    //     }
    //   }, interval);
    // }
  });
};

/* 
socket io cheat sheet

https://socket.io/docs/emit-cheatsheet/
*/
