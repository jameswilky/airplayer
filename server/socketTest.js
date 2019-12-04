const WebSocketServer = require("./WebSocketServer");

// let room = {
//   id: "5d36dd9eabc31f47282ea820",
//   playlist: []
// };

const url = "http://localhost:3000";

let token = "";
let reconnect = false;
let roomid;
let state;
const onConnect = socket => {
  console.log("connected to socket : " + socket.id);
  if (reconnect) {
    socket.emit("JOIN_ROOM", { id: roomid, userId: "123", token: "test" });

    socket.on("ROOM_UPDATED", state => {
      console.log("room updated");
    });
    socket.on("ERROR", err => {
      console.log(err);
    });
    socket.emit("PLAY", "123");
  } else {
    socket.emit("CREATE_ROOM", "test room");
    socket.on("ROOM_CREATED", payload => {
      console.log("room created", payload);
      token = payload.token;
      roomid = payload.roomId;
      socket.emit("JOIN_ROOM", { id: payload.roomId });
    });
    socket.on("ROOM_UPDATED", state => {
      state = state;
      console.log("joined room : " + state.id);
    });
  }
};

const onDisconnect = socket => {
  console.log("disconnected");
};

const config = { onConnect, onDisconnect };
const socket = WebSocketServer(url).connect(config);

setTimeout(() => {
  socket.disconnect();
}, 1000);

setTimeout(() => {
  reconnect = true;
  socket.connect();
}, 2000);

// setTimeout(() => {
//   socket.disconnect();
// }, 3000);

// setTimeout(() => {
//   socket.connect();
// }, 4000);
