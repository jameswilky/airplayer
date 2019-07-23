const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000");

let room = {
  id: "5d36dd9eabc31f47282ea820"
};
socket.emit("JOIN_ROOM", room);
socket.on("JOIN_FAILED", err => console.log(err));
socket.on("ROOM_UPDATED", room => console.dir(room));
