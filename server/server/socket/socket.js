module.exports = function(io) {
  io.on("connection", function(socket) {
    socket.on("join room", function(roomname) {
      socket.roomname = roomname;
      socket.join(roomname);
    });

    socket.on("message", function(msg) {
      socket.to(socket.roomname).emit("message", msg);
    });
  });
};