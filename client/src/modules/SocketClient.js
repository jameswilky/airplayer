import io from "socket.io-client";

const SocketClient = url => {
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
          SocketClient.connect();
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

export default SocketClient;
