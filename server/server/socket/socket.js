const { getRoom, updateRoom } = require("./roomDao");

const to = require("../helpers/to");
const events = ["ADD_TRACK"];
const dispatch = (room, { type, payload }) => {
  // Room Reducer
  // Do not use Object to assign or spread as it copies prototype properties left over from schema Object
  // todo add validation
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
    const state = { room: null };
    socket.on("JOIN_ROOM", async room => {
      /**
       * @param {obj} room {_id,name,playlist,subscribers,currentSong}
       */
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
    let prevState = {};
    setInterval(async () => {
      // Every X seconds check if state has changed.
      // If it has, sync socket state with database and update all clients

      // TODO read https://gomakethings.com/getting-the-differences-between-two-objects-with-vanilla-js/
      // then, create a diff function to test is prevState is different to state
      const room = await updateRoom(state.room);
      if (!result) console.log("Error Updating Room");
      else {
        setState(state, { room });
        setState(prevState, state);
        io.in(state.room._id).emit("ROOM_UPDATED", state.room);
      }
    }, 3000);
  });
};

/* 
socket io cheat sheet

https://socket.io/docs/emit-cheatsheet/
*/
