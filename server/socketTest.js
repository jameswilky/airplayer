const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000");

let room = {
  id: "5d36dd9eabc31f47282ea820",
  playlist: []
};
socket.on("connect", () => {
  socket.emit("JOIN_ROOM", room.id);
  socket.on("ERROR", err => console.log(err));
  socket.on("ROOM_UPDATED", room => console.log("room Updated"));
  const track = { trackId: 50 };
  setTimeout(() => {
    console.log("Removing Track...");
    socket.emit("REMOVE_TRACK", { track });
  }, 1000);

  setTimeout(() => {
    console.log("adding Track...");
    socket.emit("ADD_TRACK", { track });
  }, 2000);
});
