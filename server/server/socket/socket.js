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

const rooms = {};
const users = {};

module.exports = function(io, interval = null) {
  io.on("connection", function(socket) {
    const handleEvent = async (event, data) => {
      // Update state based on event type
      const roomId = Object.entries(socket.rooms)[1][1];
      const state = await getRoom(roomId);
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
        // After each update, send updated room to each socket in room

        io.in(nextState.id).emit("ROOM_UPDATED", {
          ...nextState
        });
        socket.emit("SUCCESS", { type: event, payload: data });
        updateRoom(nextState);
      }
    };

    socket.on("JOIN_ROOM", async ({ id, password = null, userId = null }) => {
      /**
       * @param {obj} room {id,name,playlist,subscribers,currentSong}
       */
      // todo add check to validate input is a room object

      const state = await getRoom(id);
      if (!state) {
        socket.emit("ERROR", {
          type: "JOIN_ROOM",
          payload: { id, userId },
          message: `join attempt failed, room not found`,
          code: 404
        });
        return;
      }
      const authorized = await passwordDoesMatch({
        roomId: state.id,
        password
      });
      if (authorized) {
        // todo turn this into a ADD_MEMBER event
        // if (userId) {
        //   subscribers.push({ userId, scope: "HOST" });
        // }
        // console.log("subs:", subscribers);
        // subscribers.push({ userId: "test", scope: "HOST" });
        if (!socket.subscribers) socket.subscribers = [];
        socket.subscribers.push(1);
        console.log(socket.subscribers);

        socket.join(state.id);
        io.in(state.id).emit("ROOM_UPDATED", {
          ...state
        });
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
