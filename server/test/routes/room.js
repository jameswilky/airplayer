/* This file tests the Room route*/
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Room = require("../../server/models/Room");
const to = require("../../server/helpers/to");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../index");
const should = chai.should();
chai.use(chaiHttp);

describe("Room route handlers", () => {
  let room1, room2;

  beforeEach(async () => {
    let err, res;
    // Delete everything from Database
    [err, res] = await to(Room.deleteMany({}));
    // Insert some sample data
  });

  describe("/GET room", () => {
    it("should GET all rooms", async () => {
      const [err, res] = await to(chai.request(server).get("/api/rooms"));
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.be.eql(0);
    });
  });

  describe("/POST room", () => {
    it("should POST a room", async () => {
      const room = {
        name: "Test"
      };
      const [err, res] = await to(
        chai
          .request(server)
          .post("/api/rooms")
          .send(room)
      );

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("Room created");

      res.body.room.should.have.property("name");
      res.body.room.should.have.property("playlist");
      res.body.room.should.have.property("subscribers");
      res.body.room.should.have.property("createdAt");
    });
  });

  describe("/GET/:id", () => {
    it("should GET a room by the given id", async () => {
      let err, room, res;
      // Load in test room
      const newRoom = new Room({
        name: "room1",
        playlist: [{ trackId: "123" }, { trackId: "456" }],
        currentSong: { playing: true, trackId: "123" },
        createdAt: new Date()
      });

      [err, room] = await to(newRoom.save());

      // Get Room
      [err, res] = await to(chai.request(server).get(`/api/room/${room.id}`));
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("name").eql(room.name);
    });
  });

  describe("/PUT/:id", () => {
    it("should UPDATE a room given the id", async () => {
      let room, err, res;
      // Create test room
      const newRoom = new Room({
        name: "room1",
        playlist: [{ trackId: "123" }, { trackId: "456" }],
        currentSong: { playing: true, trackId: "123" },
        createdAt: new Date()
      });

      [err, room] = await to(newRoom.save());

      // Update Room
      [err, res] = await to(
        chai
          .request(server)
          .put(`/api/room/${room.id}`)
          .send({
            name: "room3"
          })
      );
      res.should.have.status(200);
      res.body.room.should.have.property("name").eql("room3");
      res.body.room.currentSong.should.have
        .property("trackId")
        .eql(room.currentSong.trackId);
      res.body.message.should.eql("Room updated");
    });
  });
});