const io = require("socket.io-client");

let room = {
  id: "5d36dd9eabc31f47282ea820",
  playlist: []
};

const WebSocketServer = url => {
  return {
    isConnected: false,
    socket: null,
    interval: null,
    url,
    connect({ onConnect, onDisconnect }) {
      if (this.socket) {
        this.socket.destroy();
        delete this.socket;
        this.socket = null;
      }
      this.socket = io.connect(this.url);
      this.socket.on("connect", () => {
        this.isConnected = true;
        onConnect(this.socket);
      });

      this.socket.on("disconnect", () => {
        this.isConnected = false;
        onDisconnect(this.socket);
      });

      return this.socket;
    },
    disconnect() {
      if (this.socket.connected) {
        this.socket.disconnect();
      }
    }
  };
};
const url = "http://localhost:3000";

const onConnect = socket => {
  console.log("connected to socket : " + socket.id);
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
  socket.connect();
}, 2000);

setTimeout(() => {
  socket.disconnect();
}, 3000);

setTimeout(() => {
  socket.connect();
}, 4000);
