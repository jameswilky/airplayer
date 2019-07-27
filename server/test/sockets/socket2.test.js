// Dependencies
const mongoose = require("mongoose");
const Room = require("../../server/models/Room");
const http = require("http");
const ioBack = require("socket.io");
const io = require("socket.io-client");
const expect = require("chai").expect;

// Helpers
const diff = require("../../server/helpers/diff");
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
const wedding = {
  name: "wedding",
  playlist: [{ trackId: "098" }, { trackId: "4as" }, { trackId: "baodiu" }],
  currentSong: { playing: false, trackId: "4as" }
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
  beforeEach(async () => {
    // Clean Database before each test
    const [err, res] = await to(Room.deleteMany({}));
    if (err) throw "Failed to delete all from Database";
  });
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
  it("should update the state of the room for all users in that room after an action", async () => {
    // Set up Rooms
    const birthdayRoom = objectify(await createMockRoom(birthday));
    const weddingRoom = objectify(await createMockRoom(wedding));

    // Set up Clients
    const john = io.connect(url, options);
    const alice = io.connect(url, options);
    const mary = io.connect(url, options);

    let johnState;
    let aliceState;
    let maryState;

    john.emit("JOIN_ROOM", birthdayRoom.id);
    john.on("ROOM_UPDATED", state => {
      johnState = state;
    });

    alice.emit("JOIN_ROOM", birthdayRoom.id);
    alice.on("ROOM_UPDATED", state => {
      aliceState = state;
    });

    mary.emit("JOIN_ROOM", weddingRoom.id);
    mary.on("ROOM_UPDATED", state => {
      maryState = state;
    });

    // Add Track and update birthday Room
    setTimeout(() => {
      john.emit("ADD_TRACK", { trackId: "test" });
    }, 500);

    // Check final states
    setTimeout(() => {
      console.log(diff(maryState, aliceState));
      console.log(diff(johnState, aliceState));
    }, 2000);
  });
});
