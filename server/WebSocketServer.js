const io = require("socket.io-client");

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
        this.interval = setInterval(() => {
          if (this.isConnected) {
            clearInterval(this.interval);
            this.interval = null;
            return;
          }
          WebSocketServer.connect();
        }, 5000);
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
// const url = "http://localhost:3000";

// const onConnect = socket => {
//   console.log("connected to socket : " + socket.id);
// };

// const onDisconnect = socket => {
//   console.log("disconnected");
// };

// const config = { onConnect, onDisconnect };
module.exports = WebSocketServer;
