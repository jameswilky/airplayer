// Dependencies
const mongoose = require("mongoose");
const Room = require("../../server/models/Room");
const expect = require("chai").expect;
const io = require("socket.io-client");

// Helpers
const diff = require("../../server/helpers/diff");
const to = require("../../server/helpers/to");
const { createRoom } = require("../../server/daos/roomDao");
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
      let error, johnState;
      john.emit("JOIN_ROOM", { id: "0" });
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });
      john.on("ERROR", msg => (error = msg));

      await waitFor(50);
      expect(error).to.eql("join attempt failed, room not found");
      expect(johnState).to.eql(undefined);
    });
    it("should join room if the room exists", async () => {
      const room = await createRoom(birthday);
      const john = await Mocket.connectClient(url);
      let johnState;
      john.emit("JOIN_ROOM", { id: room.id });
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });

      await waitFor(50);
      expect(johnState.id.toString()).to.eql(room.id.toString()); // TODO use different assertion
      expect(johnState.name).to.eql(birthday.name);
    });
    it("should only allow users to join a room that requires a password if the password given is correct", async () => {
      const privateBirthday = Object.assign({}, birthday);
      privateBirthday.password = "secret";
      const room = await createRoom(privateBirthday);
      const john = await Mocket.connectClient(url);
      let johnState;
      john.emit("JOIN_ROOM", { id: room.id, password: "secret" });
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });

      await waitFor(50);
      expect(johnState.id.toString()).to.eql(room.id.toString()); // TODO use different assertion
      expect(johnState.name).to.eql(birthday.name);
      expect(johnState.requiresPassword).to.eql(true);
    });
    it("should prevent users from joining a room that requires a password when no password is given", async () => {
      const privateBirthday = Object.assign({}, birthday);
      privateBirthday.password = "secret";
      const room = await createRoom(privateBirthday);
      const john = await Mocket.connectClient(url);
      let johnState, err;
      john.emit("JOIN_ROOM", { id: room.id, password: "wrongSecret" });
      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });
      john.on("ERROR", msg => {
        err = msg;
      });

      await waitFor(50);
      expect(johnState).to.eql(undefined);
      expect(err).to.eql("join attempt failed, invalid password");
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
      const room = await createRoom(birthday);
      const john = await Mocket.connectClient(url);
      let johnState;

      john.emit("JOIN_ROOM", { id: room.id });
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
      john.emit("CREATE_ROOM", "testToken");
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

  describe("Room Scopes", () => {
    it("should return an error if no token is provided when attemptning to  perform host actions", async () => {
      const birthdayRoom = await createRoom(birthday);
      const john = io.connect(url, options);
      let johnState;
      let errors = [];

      john.on("connect", async () => {
        john.emit("JOIN_ROOM", { id: birthdayRoom.id });
        john.on("ROOM_UPDATED", state => {
          johnState = state;
        });

        await waitFor(10);
        john.emit("PAUSE", null);

        john.emit("PLAY", { trackId: "789" });

        john.emit("UPDATE_PLAYLIST", [{ trackId: "101112" }]);

        john.emit("REMOVE_TRACK", { trackId: "123" });
        john.on("ERROR", msg => errors.push(msg));
      });

      await waitFor(50);
      expect(johnState.currentSong.playing).to.eql(true);
      expect(errors.length).to.eql(4);
      expect(errors).to.include(
        "PAUSE requires authorization, please provide a token."
      );
      expect(errors).to.include(
        "PLAY requires authorization, please provide a token."
      );
      expect(errors).to.include(
        "UPDATE_PLAYLIST requires authorization, please provide a token."
      );
      expect(errors).to.include(
        "REMOVE_TRACK requires authorization, please provide a token."
      );
    });
    it("should should require a valid token to perform host actions", async () => {
      const birthdayRoom = await createRoom(birthday);
      const john = io.connect(url, options);
      let johnState, error;

      john.on("connect", async () => {
        john.emit("JOIN_ROOM", { id: birthdayRoom.id });
        john.on("ROOM_UPDATED", state => {
          johnState = state;
        });

        await waitFor(10);
        john.emit("PAUSE", { token: "badToken" });
        john.on("ERROR", msg => (error = msg));
      });

      await waitFor(50);
      expect(johnState.currentSong.playing).to.eql(true);
      expect(error).to.eql("PAUSE failed, not authorized");
    });
    it("should allow hosts that provide valid tokens to emit host actions", async () => {
      const john = io.connect(url, options);
      let token,
        johnState = null;
      john.emit("CREATE_ROOM", { name: "testRoom", spotifyUserId: "testUser" });
      john.on("ROOM_CREATED", payload => {
        token = payload.token;
        john.emit("JOIN_ROOM", { id: payload.roomId });
      });

      john.on("ROOM_UPDATED", state => {
        johnState = state;
      });
      await waitFor(20);

      john.emit("PLAY", { token: token, trackId: "123" });
      await waitFor(20);

      expect(token).to.be.a("string");
      expect(johnState).to.be.a("object");
      expect(johnState.currentSong.trackId).to.eql("123");
      expect(johnState.currentSong.playing).to.eql(true);
      expect(token).to.be.a("string");
    });

    it("should update the state of the room for all users in that room after an action", async () => {
      let john, alice, mary;
      let johnState, aliceState, maryState;

      const birthdayRoom = await createRoom(birthday);
      const weddingRoom = await createRoom(wedding);

      john = io.connect(url, options);

      john.on("connect", function() {
        john.emit("JOIN_ROOM", { id: birthdayRoom.id });

        alice = io.connect(url, options);
        alice.emit("JOIN_ROOM", { id: birthdayRoom.id });

        alice.on("connect", function() {
          mary = io.connect(url, options);
          mary.emit("JOIN_ROOM", { id: weddingRoom.id });

          mary.on("connect", async function() {
            await waitFor(50);
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
      console.log(johnState);
      expect(JSON.stringify(johnState)).to.eql(JSON.stringify(aliceState));
      expect(JSON.stringify(johnState)).to.not.eql(JSON.stringify(maryState));
      expect(johnState.playlist[2].trackId).to.eql("test");
      expect(maryState.playlist[2].trackId).to.eql("baodiu");
      john.disconnect();
      alice.disconnect();
      mary.disconnect();
    });
  });
});
