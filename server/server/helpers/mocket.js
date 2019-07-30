const io = require("socket.io-client");
const ioBack = require("socket.io");
const http = require("http");

const Mocket = {
  disconnectHost: host => {
    /**
     * @param {object} host takes in a socket.io object
     */
    if (host.connected) {
      host.close();
    }
    host.httpServer.close();
  },
  connectHost: () => {
    httpServer = http.createServer().listen();
    httpServerAddr = httpServer.listen().address();
    const url = `http://[${httpServerAddr.address}]:${httpServerAddr.port}`;
    const host = ioBack(httpServer);
    io.httpServer = httpServer;
    return [host, url];
  },
  connectClient: async (
    url,
    options = {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
      transports: ["websocket"]
    }
  ) => {
    let client;
    await new Promise(resolve => {
      client = io.connect(url, options);
      client.on("connect", () => {
        resolve();
      });
    });
    return client;
  },
  connectClients: async (
    n,
    url,
    options = {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
      transports: ["websocket"]
    }
  ) => {
    /**
     * @param {number} n number of clients to connect
     */
    let clients = [];
    for (let i = 0; i < n; i++) {
      let client;
      await new Promise(resolve => {
        client = io.connect(url, options);
        client.on("connect", () => {
          resolve();
        });
      });
      clients.push(client);
    }
    return clients;
  },
  disconnectClients: clients => {
    /**
     * @param {Array} clients takes in an array of socket.io-client objects
     */
    clients.forEach(client => {
      if (client.connected) {
        client.disconnect();
      }
    });
  }
};

module.exports = Mocket;
