// Dependencies
const mongoose = require("mongoose");
const Room = require("../../server/models/Room");
const expect = require("chai").expect;

// Helpers
const to = require("../../server/helpers/to");

// Test subject
const {
  getRoom,
  updateRoom,
  createRoom,
  passwordDoesMatch
} = require("../../server/daos/roomDao");

// Mock Data
const birthday = {
  name: "birthday",
  playlist: [{ uri: "123" }, { uri: "456" }],
  currentSong: { playing: true, uri: "123" }
};

describe("Room Data Access Object", () => {
  beforeEach(async () => {
    const [err, res] = await to(Room.deleteMany({}));
    if (err) throw "Failed to delete all from Database";
  });

  describe("createRoom", () => {
    it("should create a new object matching the specified the host and name given to the function", async () => {
      const { room } = await createRoom({ name: "test" });
      expect(room).to.be.a("object");
      expect(room.name).to.eql("test");
      expect(room.playlist.length).to.eql(0);
    });
    // TODO create password protected room
  });

  describe("getRoom", () => {
    it("should return a room object matching the given id", async () => {
      const { room } = await createRoom(birthday);
      const res = await getRoom(room.id);
      expect(res).to.be.a("object");
      expect(res.id).to.eql(room.id);
      expect(res).to.have.property("playlist");
      expect(res).to.have.property("currentSong");
      expect(res).to.have.property("id");
      expect(res).to.not.have.property("_id");
    });
    it("should return null if nothing matches the id", async () => {
      const res = await getRoom("123");
      expect(res).to.eql(null);
    });
  });

  describe("updateRoom", () => {
    it("should return a copy of the newly updated room on success", async () => {
      const { room } = await createRoom(birthday);
      room.name = "wedding";
      room.playlist.push({ uri: "789" });
      const res = await updateRoom(room);
      expect(res).to.be.a("object");
      expect(res.id).to.eql(room.id);
      expect(res).to.not.have.property("_id");
      expect(res.name).to.eql("wedding");
      expect(res.playlist.length).to.eql(3);
    });
    it("should return null if id is not found in the database", async () => {
      const { room } = await createRoom(birthday);
      room.id = 25;
      const res = await updateRoom(room);
      expect(res).to.eql(null);
    });
  });
  describe("passwordDoesMatch", () => {
    it("should return true if the password matches the room password specified by the room id", async () => {
      const privateBirthday = Object.assign({}, birthday);
      privateBirthday.password = "secret";
      const { room } = await createRoom(privateBirthday);
      const result = await passwordDoesMatch({
        roomId: room.id,
        password: "secret"
      });
      expect(result).to.eql(true);
    });
    it("should return true if no password is passed, when the room does not require a password", async () => {
      const { room } = await createRoom(birthday);
      const result = await passwordDoesMatch({
        roomId: room.id
      });
      expect(result).to.eql(true);
    });
    it("should return false if the password does not match the room password specified by the room id", async () => {
      const privateBirthday = Object.assign({}, birthday);
      privateBirthday.password = "secret";
      const { room } = await createRoom(privateBirthday);
      const result = await passwordDoesMatch({
        roomId: room.id,
        password: "wrongsecret"
      });
      expect(result).to.eql(false);
    });
    it("should return null if an invalid room id is passed", async () => {
      const privateBirthday = Object.assign({}, birthday);
      privateBirthday.password = "secret";
      const { room } = await createRoom(privateBirthday);
      const result = await passwordDoesMatch({
        roomId: "wrongID",
        password: "secret"
      });
      expect(result).to.eql(null);
    });
  });
});
