const io = require("socket.io-client");
const http = require("http");
const ioBack = require("socket.io");

const socketHandler = require("../socket/socket");

let socket;
let httpServer;
let httpServerAddr;
let ioServer;
let mockHostURL;
let options;

/**
 * Setup WS & HTTP servers
 */
beforeAll(done => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.listen().address();
  ioServer = ioBack(httpServer);
  socketHandler(ioServer);
  mockHostURL = `http://[${httpServerAddr.address}]:${httpServerAddr.port}`;
  options = {
    "reconnection delay": 0,
    "reopen delay": 0,
    "force new connection": true,
    transports: ["websocket"]
  };
  done();
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll(done => {
  ioServer.close();
  httpServer.close();
  done();
});

/**
 * Run before each test
 */
// beforeEach(done => {
//   // Setup
//   // Do not hardcode server port and address, square brackets are used for IPv6
//   socket = io.connect(mockHostURL, options);
//   socket.on("connect", () => {
//     done();
//   });
// });

/**
 * Run after each test
 */
// afterEach(done => {
//   // Cleanup
//   if (socket.connected) {
//     socket.disconnect();
//   }
//   done();
// });

describe("Sockets", () => {
  let client1, client2, client3;
  const room = "lobby";

  it("should send and recieve a message", function(done) {
    client1 = io.connect(mockHostURL, options);

    //set up event listener. this is the actual test we're running
    client1.on("message", function(msg) {
      expect(msg).toBe("test");
      client1.disconnect();
      client2.disconnect();
      done();
    });

    client1.on("connect", () => {
      client1.emit("join room", room);

      // Set up client2 connection
      client2 = io.connect(mockHostURL, options);

      client2.on("connect", () => {
        client2.emit("join room", room);
        client2.emit("message", "test");
      });
    });
  });

  it("should send and receive a message only to users in the same room", function(done) {
    client2CallCount = 0;
    client3CallCount = 0;

    client1 = io.connect(mockHostURL, options);

    client1.on("connect", function() {
      client1.emit("join room", room);

      client2 = io.connect(mockHostURL, options);
      client2.emit("join room", room);

      client2.on("connect", function() {
        client3 = io.connect(mockHostURL, options);
        client3.emit("join room", "test");

        client3.on("connect", function() {
          client1.emit("message", "test");
        });

        client3.on("message", function() {
          client3CallCount++;
        });
      });

      client2.on("message", function() {
        client2CallCount++;
      });
    });

    setTimeout(function() {
      expect(client2CallCount).toBe(1);
      expect(client3CallCount).toBe(0);
      client1.disconnect();
      client2.disconnect();
      client3.disconnect();
      done();
    }, 25);
  });
});

/* 
References
https://medium.com/@tozwierz/testing-socket-io-with-jest-on-backend-node-js-f71f7ec7010f

https://alexzywiak.github.io/testing-socket-io-with-mocha-and-chai/index.html
*/
