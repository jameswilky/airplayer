const { getRoom, updateRoom, passwordDoesMatch } = require("../daos/roomDao");
const { ALL, HOST } = require("../actions/scopes");
const { tokenIsValid } = require("../daos/hostDao");
const dispatch = require("../reducers/roomReducer");
const validateEvent = require("../middleware/validateEvent");

// Helpers
const getRoomId = socket => Object.entries(socket.rooms)[1][1];
const isHost = socket => {
  return rooms[getRoomId(socket)].host === socket.id;
};
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
      async ({ id, password = null, userId = null, token = null }) => {
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

        let socketToken = token; // node engine bug? cant access token in below if block
        if (authorized) {
          const newUser = {
            userId: userId,
            socketId: socket.id,
            scope: "CLIENT"
          };
          // TODO find cleaner way of doing this
          if (rooms[id]) {
            state.host = rooms[id].host;
            state.subscribers = rooms[id].subscribers;
          }

          users[socket.id] = newUser;
          rooms[id] = state;
          rooms[id].subscribers.push(newUser);

          if (socketToken) {
            const tokenMatches = await tokenIsValid({
              roomId: id,
              token: socketToken
            });
            if (tokenMatches) {
              rooms[id].host = socket.id;
              users[socket.id].scope = "HOST";
            }
          }

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
        if (inARoom(socket)) {
          if (isHost(socket)) {
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
