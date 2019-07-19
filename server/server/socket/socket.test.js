const io = require("socket.io-client");
const http = require("http");
const ioBack = require("socket.io");

const socketHandler = require("../socket/socket");

let httpServer;
let httpServerAddr;
let host;
let mockHostURL;
let options;

/**
 * Setup WS & HTTP servers
 */
beforeAll(done => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.listen().address();
  host = ioBack(httpServer);
  socketHandler(host);
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
  host.close();
  httpServer.close();
  done();
});

describe("Socket functionality", () => {
  let client, client2, client3;

  /**
   * Run before each test
   */
  beforeEach(done => {
    // Make 3 client connections
    client = io.connect(mockHostURL, options);
    client.on("connect", () => {
      client2 = io.connect(mockHostURL, options);
      client2.on("connect", () => {
        client3 = io.connect(mockHostURL, options);
        client3.on("connect", () => done());
      });
    });
  });

  /**
   * Run after each test
   */
  afterEach(done => {
    // Cleanup
    if (host.connected) {
      host.close();
    }
    if (client.connected) {
      client.disconnect();
      client2.disconnect();
      client3.disconnect();
    }

    done();
  });
  it("should send and recieve a message from server", done => {
    // once connected, emit Hello World
    host.emit("echo", "Hello World");
    client.on("echo", message => {
      // Check that the message matches
      expect(message).toBe("Hello World");
      done();
    });
  });

  it("should send and recieve a message", function(done) {
    //set up event listener. this is the actual test we're running
    client.on("message", function(msg) {
      expect(msg).toBe("test");
      done();
    });

    client.emit("join room", "room1");
    client2.emit("join room", "room1");
    client2.emit("message", "test");
  });

  // it("should send and receive a message only to users in the same room", function(done) {
  //   let client2CallCount = 0;
  //   let client3CallCount = 0;
  //   let message;

  //   client.emit("join room", "room1");
  //   client2.emit("join room", "room1");
  //   client3.emit("join room", "room2");

  //   client.emit("message", "Message to Room 1");

  //   client3.on("message", function() {
  //     client3CallCount++;
  //   });

  //   client2.on("message", function(msg) {
  //     message = msg;
  //     client2CallCount++;
  //   });

  //   setTimeout(function() {
  //     expect(client2CallCount).toBe(1);
  //     expect(message).toBe("Message to Room 1");
  //     expect(client3CallCount).toBe(0);
  //     done();
  //   }, 200);
  // });
});

/* 
References
https://medium.com/@tozwierz/testing-socket-io-with-jest-on-backend-node-js-f71f7ec7010f

https://alexzywiak.github.io/testing-socket-io-with-mocha-and-chai/index.html
*/
