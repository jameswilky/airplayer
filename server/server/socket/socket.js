const {
  getRoom,
  addTrack,
  removeTrack,
  updatePlayist,
  pause,
  play,
  addMember,
  removeMember
} = require("./roomDao");

const to = require("../helpers/to");

module.exports = function(io) {
  io.on("connection", function(socket) {
    console.dir(`Server has now connected to socket ${socket.id}`);
    socket.on("JOIN_ROOM", async roomToJoin => {
      /**
       * @param {obj} roomToJoin {_id,name,playlist,subscribers,currentSong}
       */
      //
      const room = await getRoom(roomToJoin);

      if (!room) {
        socket.emit("JOIN_FAILED", `404 Error : Room not Found`);
      } else {
        socket.join(room._id);
        // socket.emit("JOIN_SUCCESS", room);
        console.log(room._id);
        io.in(room._id).emit("ROOM_UPDATED", room);
      }
    });

    socket.on("ADD_TRACK", async (room, track) => {
      const [err, updatedRoom] = await to(addTrack(room, track));
      socket.in(socket.room).emit("ROOM_UPDATED", updatedRoom);
    });
  });
};

/* 
socket io cheat sheet

https://socket.io/docs/emit-cheatsheet/
*/
