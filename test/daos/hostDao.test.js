// Dependencies
const mongoose = require("mongoose");
const Host = require("../../server/models/Host");
const expect = require("chai").expect;

// Helpers
const to = require("../../server/helpers/to");

// Test subject
const {
  createHost,
  getHostById,
  getHostBySpotifyUserId
} = require("../../server/daos/hostDao");

describe("Host Data Access Object", () => {
  beforeEach(async () => {
    const [err, res] = await to(Host.deleteMany({}));
    if (err) throw "Failed to delete all from Database";
  });

  describe("createHost", () => {
    it("should create a host containing the roomId, randomly generated token and specified spotifyUserId", async () => {
      const { spotifyUserId, roomId, token } = await createHost({
        spotifyUserId: "123",
        roomId: "456"
      });
      expect(spotifyUserId).to.eql("123");
      expect(roomId).to.eql("456");
      expect(token).to.not.eql(null);
    });
  });

  describe("getHostById", () => {
    it("should return a host object matching the given id", async () => {
      const { id } = await createHost({
        spotifyUserId: "123",
        roomId: "456"
      });

      const { spotifyUserId, roomId, token } = await getHostById(id);
      expect(spotifyUserId).to.eql("123");
      expect(roomId).to.eql("456");
      expect(token).to.not.eql(null);
    });
    it("should return null if nothing matches the id", async () => {
      const host = await getHostById("123");
      expect(host).to.eql(null);
    });
  });

  describe("getHostBySpotifyUserId", () => {
    it("should return a host object matching the given spotify user id", async () => {
      const { spotifyUserId } = await createHost({
        spotifyUserId: "123",
        roomId: "456"
      });

      const host = await getHostBySpotifyUserId(spotifyUserId);
      expect(host.spotifyUserId).to.eql("123");
      expect(host.roomId).to.eql("456");
      expect(host.token).to.not.eql(null);
    });
    it("should return null if the spotify user id is not found in the database", async () => {
      const host = await getHostBySpotifyUserId("123");
      expect(host).to.eql(null);
    });
  });
});
