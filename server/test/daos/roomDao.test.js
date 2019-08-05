// Dependencies
const mongoose = require("mongoose");
const Room = require("../../server/models/Room");
const expect = require("chai").expect;

// Helpers
const createMockRoom = require("../../server/helpers/createMockRoom");
const to = require("../../server/helpers/to");

// Test subject
const {
  getRoom,
  updateRoom,
  createRoom
} = require("../../server/daos/roomDao");

// Mock Data
const birthday = {
  name: "birthday",
  playlist: [{ trackId: "123" }, { trackId: "456" }],
  currentSong: { playing: true, trackId: "123" }
};

describe("Room Data Access Object", () => {
  beforeEach(async () => {
    const [err, res] = await to(Room.deleteMany({}));
    if (err) throw "Failed to delete all from Database";
  });

  describe("createRoom", () => {
    it("should create a new object matching the specified the host and name given to the function", async () => {
      const room = await createRoom("test");
      expect(room).to.be.a("object");
      expect(room.name).to.eql("test");
      expect(room.playlist.length).to.eql(0);
    });
  });

  describe("getRoom", () => {
    it("should return a room object matching the given id", async () => {
      const room = await createMockRoom(birthday);
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
      const room = await createMockRoom(birthday);
      room.name = "wedding";
      room.playlist.push({ trackId: "789" });
      const res = await updateRoom(room);

      expect(res).to.be.a("object");
      expect(res.id).to.eql(room.id);
      expect(res).to.not.have.property("_id");
      expect(res.name).to.eql("wedding");
      expect(res.playlist.length).to.eql(3);
    });
    it("should return null if id is not found in the database", async () => {
      const room = await createMockRoom(birthday);
      room.id = 25;
      const res = await updateRoom(room);
      expect(res).to.eql(null);
    });
  });
});
