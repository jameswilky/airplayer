// Dependencies
const http = require("http");
const ioBack = require("socket.io");
const io = require("socket.io-client");
const expect = require("chai").expect;
const to = require("../../server/helpers/to");
const createMockRoom = require("../../server/helpers/createMockRoom");
const objectify = require("../../server/helpers/objectify");
// Test subject
const config = require("../../server/socket/socket");

let httpServer;
let httpServerAddr;
let host;
let url;
let options;

// Mock Data
const birthday = {
  name: "birthday",
  playlist: [{ trackId: "123" }, { trackId: "456" }],
  currentSong: { playing: true, trackId: "123" }
};

// Set up host server
beforeEach(done => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.listen().address();
  host = ioBack(httpServer);
  config(host);

  url = `http://[${httpServerAddr.address}]:${httpServerAddr.port}`;
  options = {
    "reconnection delay": 0,
    "reopen delay": 0,
    "force new connection": true,
    transports: ["websocket"]
  };
  done();
});

// Close HTTP server
afterEach(done => {
  host.close();
  httpServer.close();
  done();
});

describe("Sockets backend", () => {
  it("Should return an error if room does not exist", () => {
    const john = io.connect(url, options);

    john.emit("JOIN_ROOM", "0");
    john.on("ERROR", msg =>
      expect(msg).to.eql("join attempt failed, room not found")
    );
  });
  it("should join room if room exists", async () => {
    const room = objectify(await createMockRoom(birthday));
    const john = io.connect(url, options);

    john.emit("JOIN_ROOM", room.id);
    john.on("ROOM_UPDATED", state => {
      expect(state.id).to.eql(room.id.toString());
      expect(state.name).to.eql(birthday.name);
    });
  });
});
