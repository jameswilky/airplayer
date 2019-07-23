var expect = require("chai").expect;
var io = require("socket.io-client");

var app = require("../../server/socket/socket");

var clientUrl = "http://localhost:3000";
var clientOptions = {
  transports: ["websocket"],
  "force new connection": true
};

var room = "lobby";
const setUp = connections => {};
const cleanUp = connections => {
  connections.forEach(connection => {
    connection.disconnect();
    connection.close();
  });
};

describe("Sockets", function() {
  let client1, client2, client3;

  beforeEach(done => {
    // Make 3 client connections
    client1 = io.connect(clientUrl, clientOptions);
    client1.on("connect", () => {
      client2 = io.connect(clientUrl, clientOptions);
      client2.on("connect", () => {
        client3 = io.connect(clientUrl, clientOptions);
        client3.on("connect", () => done());
      });
    });
  });
  it("should send and recieve a message from client to server", done => {});
  it("should send and receive a message from client to client", function(done) {
    // Set up client1 connection
    client1 = io.connect(clientUrl, clientOptions);

    // Set up event listener.  This is the actual test we're running
    client1.on("message", function(msg) {
      expect(msg).to.equal("test");
      cleanUp([client1, client2, client3]);
      done();
    });

    client1.on("connect", function() {
      client1.emit("join room", room);

      // Set up client2 connection
      client2 = io.connect(clientUrl, clientOptions);

      client2.on("connect", function() {
        // Emit event when all clients are connected.
        client2.emit("join room", room);
        client2.emit("message", "test");
      });
    });
  });
  it("should send and receive a message only to users in the same room", function(done) {
    client2CallCount = 0;
    client3CallCount = 0;

    client1 = io.connect(clientUrl, clientOptions);

    client1.on("connect", function() {
      client1.emit("join room", room);

      client2 = io.connect(clientUrl, clientOptions);
      client2.emit("join room", room);

      client2.on("connect", function() {
        client3 = io.connect(clientUrl, clientOptions);
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
      expect(client2CallCount).to.equal(1);
      expect(client3CallCount).to.equal(0);
      cleanUp([client1, client2, client3]);
      done();
    }, 25);
  });
});
