const { getRoom, updateRoom } = require("./roomDao");
const diff = require("../helpers/diff");
const Room = require("../models/Room");

const events = [
  "ADD_TRACK",
  "REMOVE_TRACK",
  "PAUSE",
  "PLAY",
  "UPDATE_PLAYLIST"
];
const dispatch = (state, { type, payload }) => {
  // Room Reducer
  // Do not use Object to assign or spread as it copies prototype properties left over from schema Object
  // todo add validation
  switch (type) {
    case "ADD_TRACK":
      const newState = state;
      newState.playlist.push(payload.track);
      return newState;

    default:
      return state;
  }
};
const setState = (prev, next) => {
  if (next instanceof Room) {
    next = JSON.parse(JSON.stringify(next));
  }
  Object.assign(prev, next);
};

module.exports = function(io) {
  io.on("connection", function(socket) {
    const state = {};

    socket.on("JOIN_ROOM", async room => {
      /**
       * @param {obj} room {_id,name,playlist,subscribers,currentSong}
       */
      const nextState = await getRoom(room);
      if (!nextState) {
        socket.emit("ERROR", `join attempt failed, room not found`);
      } else {
        setState(state, nextState);

        socket.join(state._id);
        io.in(state._id).emit("ROOM_UPDATED", state);
      }
    });

    events.forEach(event => {
      socket.on(event, data => {
        // Update state based on event type
        const nextState = dispatch(state, {
          type: event,
          payload: data
        });
        setState(state, nextState);
        // After each update, send updated room to each socket in room
        io.in(state._id).emit("ROOM_UPDATED", state);
      });
    });

    let prevState = {};
    setInterval(async () => {
      // Every X seconds check if state has changed.
      // If it has, sync socket state with database and update all clients

      if (diff(state, prevState)) {
        const room = await updateRoom(state);
        if (!room) console.log("Error Updating Room");
        else {
          setState(state, room);
          setState(prevState, state);
          io.in(state._id).emit("ROOM_UPDATED", state);
        }
      }
    }, 3000);
  });
};

/* 
socket io cheat sheet

https://socket.io/docs/emit-cheatsheet/
*/
