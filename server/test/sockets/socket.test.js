// Dependencies
const mongoose = require("mongoose");
const Room = require("../../server/models/Room");
const expect = require("chai").expect;
const io = require("socket.io-client");

// Helpers
const diff = require("../../server/helpers/diff");
const to = require("../../server/helpers/to");
const createMockRoom = require("../../server/helpers/createMockRoom");
const Mocket = require("../../server/helpers/mocket");

// Test subject
const config = require("../../server/socket/socket");

let host, url;
let options = {
  "reconnection delay": 0,
  "reopen delay": 0,
  "force new connection": true,
  transports: ["websocket"]
};

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
  [host, url] = Mocket.connectHost();
  config(host);
  done();
});

// Close HTTP server
afterEach(done => {
  Mocket.disconnectHost(host);
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
      const john = await Mocket.connectClient(url);
      let error;
      john.emit("JOIN_ROOM", "0");
      john.on("ERROR", msg => (error = msg));

      await waitFor(50);
      expect(error).to.eql("join attempt failed, room not found");
    });
    it("should join room if room exists", async () => {
      const room = await createMockRoom(birthday);
      const john = await Mocket.connectClient(url);
      let johnState;
      john.emit("JOIN_ROOM", room.id);
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });

      await waitFor(10);
      expect(johnState.id.toString()).to.eql(room.id.toString()); // TODO use different assertion
      expect(johnState.name).to.eql(birthday.name);
    });
  });

  describe("ADD_TRACK", () => {
    it("TODO: Returns an error if not in a room", () => {}); // TODO add after authorization
    it("updates the state for the sender after emiting ADD_TRACK", async () => {
      const room = await createMockRoom(birthday);
      const john = await Mocket.connectClient(url);
      let johnState;

      john.emit("JOIN_ROOM", room.id);
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });

      await waitFor(10);
      john.emit("ADD_TRACK", { trackId: "newSong" });

      await waitFor(10);
      expect(johnState.playlist.length).to.eql(3);
      expect(johnState.playlist[2].trackId).to.eql("newSong");
    });
  });

  it("should update the state of the room for all users in that room after an action", async () => {
    // Set up Rooms
    const birthdayRoom = await createMockRoom(birthday);
    const weddingRoom = await createMockRoom(wedding);

    const [john, alice, mary] = await Mocket.connectClients(3, url);

    // const alice = await Mocket.connectClient(url);
    // const mary = await Mocket.connectClient(url);
    // const john = await Mocket.connectClient(url);

    let johnState;
    let aliceState;
    let maryState;

    john.on("ROOM_UPDATED", state => {
      johnState = state;
    });

    alice.on("ROOM_UPDATED", state => {
      aliceState = state;
    });

    mary.on("ROOM_UPDATED", state => {
      maryState = state;
    });

    alice.emit("JOIN_ROOM", birthdayRoom.id);
    mary.emit("JOIN_ROOM", weddingRoom.id);
    john.emit("JOIN_ROOM", birthdayRoom.id);
    // await waitFor(100);

    // let johnError, aliceError, maryError;
    // john.on("ERROR", msg => (johnError = msg));
    // alice.on("ERROR", msg => (aliceError = msg));
    // mary.on("ERROR", msg => (maryError = msg));

    // Add Track and update birthday Room
    // console.log(maryError, johnError, aliceError);

    // john.emit("ADD_TRACK", { trackId: "test" });

    // Check final states
    // await waitFor(400);
    // console.log(msg);
    // console.log(aliceState, maryState, johnState);
    // console.log(maryError, johnError, aliceError);
  });

  it("should send and receive a message only to users in the same room", async () => {
    let john, alice, mary;
    let johnState, aliceState, maryState;

    const birthdayRoom = await createMockRoom(birthday);
    const weddingRoom = await createMockRoom(wedding);

    john = io.connect(url, options);

    john.on("connect", function() {
      john.emit("JOIN_ROOM", birthdayRoom.id);

      alice = io.connect(url, options);
      alice.emit("JOIN_ROOM", birthdayRoom.id);

      alice.on("connect", function() {
        mary = io.connect(url, options);
        mary.emit("JOIN_ROOM", weddingRoom.id);

        mary.on("connect", function() {
          john.emit("ADD_TRACK", { trackId: "test" });
        });

        mary.on("ROOM_UPDATED", state => {
          maryState = state;
        });
      });

      alice.on("ROOM_UPDATED", state => {
        aliceState = state;
      });
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });
    });

    await waitFor(50);
    console.log(johnState.playlist);
    console.log(aliceState.playlist);
    console.log(maryState.playlist);
    john.disconnect();
    alice.disconnect();
    mary.disconnect();
  });
});
