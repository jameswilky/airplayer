var expect = require("chai").expect;
var io = require("socket.io-client");

var app = require("../../server/socket/socket");

var socketUrl = "http://localhost:3000";

var options = {
  transports: ["websocket"],
  "force new connection": true
};

var room = "lobby";

describe("Sockets", function() {
  var client1, client2, client3;

  it("should send and receive a message", function(done) {
    // Set up client1 connection
    client1 = io.connect(socketUrl, options);

    // Set up event listener.  This is the actual test we're running
    client1.on("message", function(msg) {
      expect(msg).to.equal("test");

      // Disconnect both client connections
      client1.disconnect();
      client2.disconnect();
      done();
    });

    client1.on("connect", function() {
      client1.emit("join room", room);

      // Set up client2 connection
      client2 = io.connect(socketUrl, options);

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

    client1 = io.connect(socketUrl, options);

    client1.on("connect", function() {
      client1.emit("join room", room);

      client2 = io.connect(socketUrl, options);
      client2.emit("join room", room);

      client2.on("connect", function() {
        client3 = io.connect(socketUrl, options);
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
      client1.disconnect();
      client2.disconnect();
      client3.disconnect();
      done();
    }, 25);
  });
});
