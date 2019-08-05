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

// used to wait an arbitrary amount of time for all events to fire on a socket
const waitFor = ms => {
  const mult = 1; // modify this value to increase the amount of time all waitFor statements in the test suite
  return new Promise(resolve => {
    setTimeout(resolve, ms * mult);
  });
};

describe("Sockets backend", () => {
  beforeEach(async () => {
    // Clean Database before each test
    const [err, res] = await to(Room.deleteMany({}));
    if (err) throw "Failed to delete all from Database";
    [host, url] = Mocket.connectHost();
    config(host);
  });
  afterEach(done => {
    Mocket.disconnectHost(host);
    done();
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

      await waitFor(50);
      expect(johnState.id.toString()).to.eql(room.id.toString()); // TODO use different assertion
      expect(johnState.name).to.eql(birthday.name);
    });
  });

  describe("ADD_TRACK", () => {
    it("Returns an error if not in a room", async () => {
      let johnState, error;
      const john = io.connect(url, options);

      john.on("connect", () => {
        john.emit("ADD_TRACK", { trackId: "newSong" });
        john.on("ROOM_UPDATED", state => {
          johnState = state;
        });
        john.on("ERROR", msg => {
          error = msg;
        });
      });

      await waitFor(50);
      expect(error).to.eql("ADD_TRACK failed, can only be used inside a room");
      expect(johnState).to.eql(undefined);
    }); // TODO add after authorization
    it("updates the state for the sender after emiting ADD_TRACK", async () => {
      const room = await createMockRoom(birthday);
      const john = await Mocket.connectClient(url);
      let johnState;

      john.emit("JOIN_ROOM", room.id);
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });

      await waitFor(25);
      john.emit("ADD_TRACK", { trackId: "newSong" });

      await waitFor(25);
      expect(johnState.playlist.length).to.eql(3);
      expect(johnState.playlist[2].trackId).to.eql("newSong");
    });
  });

  describe("CREATE_ROOM", () => {
    it("should trigger a ROOM_CREATED event with a payload containing a token and a roomId", async () => {
      const john = io.connect(url, options);
      let token,
        roomId,
        err = null;
      john.emit("CREATE_ROOM", "test");
      john.on("ROOM_CREATED", payload => {
        token = payload.token;
        roomId = payload.roomId;
      });
      john.on("ERROR", msg => {
        err = msg;
      });
      await waitFor(50);

      expect(token).to.be.a("string");
      expect(roomId).to.be.a("string");
      expect(err).to.eql(null);
    });
  });

  it("should disallow clients from executing host actions", async () => {
    const birthdayRoom = await createMockRoom(birthday);
    const john = io.connect(url, options);
    let johnState, error;

    john.on("connect", async () => {
      john.emit("JOIN_ROOM", birthdayRoom.id);
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });

      await waitFor(10);
      john.emit("PAUSE", null);
      john.on("ERROR", msg => (error = msg));
    });

    await waitFor(50);
    expect(johnState.currentSong.playing).to.eql(true);
    expect(error).to.eql("PAUSE failed, not authorized");
  });

  // it("should allow hosts to execute host actions", async () => {
  //   const john = io.connect(url, options);
  //   let msg = null;
  //   let johnState = null;
  //   const host = { socketId: null };
  //   john.on("connect", async function() {
  //     host.socketId = john.io.engine.id;

  //     const birthdayRoom = await createMockRoom(birthday);
  //     john.emit("JOIN_ROOM", birthdayRoom.id);
  //     john.on("ROOM_UPDATED", state => {
  //       johnState = state;
  //     });

  //     await waitFor(10);
  //     john.emit("PAUSE", null);
  //     john.on("ERROR", msg => (error = msg));
  //   });

  //   await waitFor(50);
  //   // expect(msg).to.eql(null);
  //   // expect(johnState.currentSong.playing).to.eql(false);
  //   console.log(msg);
  //   // expect(host.socketId).to.eql(john.io.engine.id);
  // });

  it("should update the state of the room for all users in that room after an action", async () => {
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

    await waitFor(100);
    expect(JSON.stringify(johnState)).to.eql(JSON.stringify(aliceState));
    expect(JSON.stringify(johnState)).to.not.eql(JSON.stringify(maryState));
    expect(johnState.playlist[2].trackId).to.eql("test");
    expect(maryState.playlist[2].trackId).to.eql("baodiu");
    john.disconnect();
    alice.disconnect();
    mary.disconnect();
  });
});
