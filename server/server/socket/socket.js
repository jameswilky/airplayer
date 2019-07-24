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
      state.room = await getRoom(room);
      if (!state.room) {
        socket.emit("ERROR", `join attempt failed, room not found`);
      } else {
        socket.join(state.room._id);
        io.in(state.room._id).emit("ROOM_UPDATED", state.room);
      }
    });
    // socket.on("ADD_TRACK", async ({ room, track }) => {
    //   room = await addTrack(room, track);
    //   !room
    //     ? socket.emit("ERROR", "failed to add track")
    //     : io.in(room._id).emit("ROOM_UPDATED", room);
    // });

    events.forEach(event => {
      socket.on(event, data => {
        // Update state based on event type

        const nextRoomState = dispatch(state.room, {
          type: event,
          payload: data
        });

        const nextState = { room: nextRoomState };
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
