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

// Helpers
const getRoomId = socket => Object.entries(socket.rooms)[1][1];
const socketIsHost = socket =>
  rooms[getRoomId(socket)].host.socketId === socket.id;
const inARoom = socket => {
  // A socket always has 1 room attached as a room is naturally created on connection
  // So a socket should have 2 rooms if it has joined a user-created room
  return Object.keys(socket.rooms).length > 1;
};

// Server state
const rooms = {};
const users = {};

module.exports = function(io, interval = null) {
  io.on("connection", function(socket) {
    const handleEvent = async (event, data) => {
      // Update state based on event type
      const roomId = getRoomId(socket);
      // const state = await getRoom(roomId);
      const state = rooms[roomId];
      const error = validateEvent(state, { type: event, payload: data });
      if (error) {
        socket.emit("ERROR", {
          type: event,
          payload: data,
          message: error,
          code: 400
        });
      } else {
        // After each update, send updated room to each socket in room
        rooms[roomId] = dispatch(state, {
          type: event,
          payload: data
        });

        // Make sure not to pass token to client
        const { token, ...nextState } = rooms[roomId];
        io.in(nextState.id).emit("ROOM_UPDATED", nextState);
        socket.emit("SUCCESS", { type: event, payload: data });
        updateRoom(nextState);
      }
    };

    socket.on(
      "JOIN_ROOM",
      async ({ id, password = null, userId = null, token }) => {
        /**
         * @param {obj} room {id,name,playlist,subscribers,currentSong}
         */
        // todo add check to validate input is a room object

        if (!userId || !id) return false;
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

        let socketToken = token; // bug? cant access token in below if block
        if (authorized) {
          // TODO Check db against token, if it matches set scope to Host
          // add room[id].host : {socketid, token} field to room

          console.log(socketToken);
          const isHost = true;
          const newUser = {
            userId: userId,
            socketId: socket.id,
            scope: isHost ? "HOST" : "CLIENT"
          };
          users[socket.id] = newUser;
          rooms[id] = state;
          rooms[id].subscribers.push(newUser);

          socket.join(id);
          const { token, ...nextState } = rooms[id];
          io.in(id).emit("ROOM_UPDATED", nextState);
        } else {
          socket.emit("ERROR", {
            type: "JOIN_ROOM",
            payload: { id, userId },
            message: `join attempt failed, invalid password`,
            code: 403
          });
        }
      }
    );

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
        // TODO check the incoming socket to see if it matches the token, if so user is host

        // if (!socketIsHost(socket)) {
        if (false) {
          socket.emit(
            "ERROR",
            `${event} requires authorization, please provide a token.`
          );
          return;
        }
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
  });
};

/* 
socket io cheat sheet

https://socket.io/docs/emit-cheatsheet/
*/
