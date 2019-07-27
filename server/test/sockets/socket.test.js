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

const waitFor = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

describe("Sockets backend", () => {
  beforeEach(async () => {
    // Clean Database before each test
    const [err, res] = await to(Room.deleteMany({}));
    if (err) throw "Failed to delete all from Database";
  });
  describe("JOIN_ROOM", () => {
    it("Should return an error if room does not exist", async () => {
      const room = await createMockRoom(birthday);

      const john = io.connect(url, options);
      let error;
      john.emit("JOIN_ROOM", "0");
      john.on("ERROR", msg => (error = msg));

      await waitFor(50);
      expect(error).to.eql("join attempt failed, room not found");
    });
    it("should join room if room exists", async () => {
      const room = await createMockRoom(birthday);
      const john = io.connect(url, options);
      let johnState;
      john.emit("JOIN_ROOM", room.id);
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });

      await waitFor(50);
      expect(johnState.id.toString()).to.eql(room.id.toString()); // TODO use different assertion
      expect(johnState.name).to.eql(birthday.name);
    });
  });

  describe("ADD_TRACK", () => {
    it("TODO: Returns an error if not in a room", () => {}); // TODO add after authorization
    it("updates the state for the sender after emiting ADD_TRACK", async () => {
      const room = await createMockRoom(birthday);
      const john = io.connect(url, options);
      let johnState;
      john.emit("JOIN_ROOM", room.id);
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });

      await waitFor(50);
      john.emit("ADD_TRACK", { trackId: "newSong" });

      await waitFor(50);
      expect(johnState.playlist.length).to.eql(3);
      expect(johnState.playlist[2].trackId).to.eql("newSong");
    });
  });

  // it("should update the state of the room for all users in that room after an action", async () => {
  //   // Set up Rooms
  //   const birthdayRoom = await createMockRoom(birthday);
  //   const weddingRoom = await createMockRoom(wedding);

  //   // Set up Clients
  //   const john = io.connect(url, options);
  //   const alice = io.connect(url, options);
  //   const mary = io.connect(url, options);

  //   let johnState;
  //   let aliceState;
  //   let maryState;

  //   john.emit("JOIN_ROOM", birthdayRoom.id);
  //   john.on("ROOM_UPDATED", state => {
  //     johnState = state;
  //   });

  //   alice.emit("JOIN_ROOM", birthdayRoom.id);
  //   alice.on("ROOM_UPDATED", state => {
  //     aliceState = state;
  //   });

  //   mary.emit("JOIN_ROOM", weddingRoom.id);
  //   mary.on("ROOM_UPDATED", state => {
  //     maryState = state;
  //   });

  //   // Add Track and update birthday Room
  //   setTimeout(() => {
  //     john.emit("ADD_TRACK", { trackId: "test" });
  //     // john.on("ROOM_UPDATED", state => {
  //     //   johnState = state;
  //     // });
  //     // alice.on("ROOM_UPDATED", state => {
  //     //   aliceState = state;
  //     // });
  //     // mary.on("ROOM_UPDATED", state => {
  //     //   maryState = state;
  //     // });
  //   });

  //   // Check final states
  //   setTimeout(() => {
  //     console.log(maryState.playlist, johnState.playlist, aliceState.playlist);
  //   }, 2000);
  // });
});
