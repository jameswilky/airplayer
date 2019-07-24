const { getRoom } = require("./roomDao");

const to = require("../helpers/to");
const events = ["ADD_TRACK"];
const dispatch = (room, { type, payload }) => {
  // Room Reducer
  // Do not use Object to assign or spread as it copies prototype properties left over from schema Object
  switch (type) {
    case "ADD_TRACK":
      const newRoom = room;
      newRoom.playlist.push(payload.track);
      return newRoom;

    default:
      return room;
  }
};
const setState = (prev, next) => {
  // All state changes to should invoked with this function
  // do not use state = newState
  Object.assign(prev, next);
};

module.exports = function(io) {
  io.on("connection", function(socket) {
    console.dir(`Server has now connected to socket ${socket.id}`);
    const state = { room: null };
    socket.on("JOIN_ROOM", async room => {
      /**
       * @param {obj} roomToJoin {_id,name,playlist,subscribers,currentSong}
       */
      //
      const nextState = { room: await getRoom(room) };
      if (!nextState) {
        socket.emit("ERROR", `join attempt failed, room not found`);
      } else {
        setState(state, nextState);
        socket.join(state.room._id);
        io.in(state.room._id).emit("ROOM_UPDATED", state.room);
      }
    });

    events.forEach(event => {
      socket.on(event, data => {
        // Update state based on event type
        const nextState = {
          room: dispatch(state.room, {
            type: event,
            payload: data
          })
        };
        setState(state, nextState);
        // After each update, send updated room to each socket in room
        io.in(state.room._id).emit("ROOM_UPDATED", state.room);
      });
    });
  });
};

/* 
socket io cheat sheet

https://socket.io/docs/emit-cheatsheet/
*/
