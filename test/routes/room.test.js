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

const token =
  "BQDFZ3CNc5pNfRYmSTuTC2xoE4VLiwPGpaNoEK318019AwAcSCEQHGiQqC1KggRj52oTce7sm6VO3hw9DSJjLKCPv7rP5XTXf8gSYZ1gFpGmHjuz0NSzH3AkhBlg61iPGQ3AvZs5jG_IC23c102Hx0N96gIremzx0e75XaaH_aBF6kQZxHRnkWEZclcBqiCUpdxV";

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
        name: "Test",
        userId: "someUser",
        playlist: [{ uri: "spotify:track:123" }]
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
        playlist: [{ uri: "123" }, { uri: "456" }],
        currentSong: { playing: true, uri: "123" },
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
        playlist: [{ uri: "123" }, { uri: "456" }],
        currentSong: { playing: true, uri: "123" },
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
        .property("uri")
        .eql(room.currentSong.uri);
      res.body.message.should.eql("Room updated");
    });
  });

  describe("/DELETE/:id", () => {
    it("should DELETE a room given the id", async () => {
      let room, err, res;
      // Create test room
      const newRoom = new Room({
        name: "room1",
        playlist: [{ uri: "123" }, { uri: "456" }],
        currentSong: { playing: true, uri: "123" },
        createdAt: new Date()
      });

      [err, room] = await to(newRoom.save());

      //Delete room
      [err, res] = await to(
        chai.request(server).delete(`/api/room/${room.id}`)
      );

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("Room deleted");
      res.body.result.should.have.property("ok").eql(1);
      res.body.result.should.have.property("n").eql(1);
    });
  });
  describe("/POST/:id/vibe", () => {
    it("should return a vibe object for a newly created room", async () => {
      // if failing, check if token has expired
      let err,
        res = null;
      const room = {
        name: "Test",
        userId: "someUser",
        playlist: [{ uri: "spotify:track:123" }]
      };
      [err, res] = await to(
        chai
          .request(server)
          .post("/api/rooms")
          .send(room)
      );

      const id = res.body.room.id;
      [err, res] = await to(
        chai
          .request(server)
          .post(`/api/room/${id}/vibe`)
          .send({
            roomId: id,
            accessToken: token,
            uris: [
              "7ouMYWpwJ422jRcDASZB7P",
              "4VqPOruhp5EdPBeR92t6lQ",
              "2takcwOaAZWiXQijPHIx7B"
            ]
          })
      );

      const vibe = res.body;
      console.log(vibe);

      if (vibe === undefined) console.log("Check if token has expired");

      // vibe.properties.danceability.mean.should.eql(0.696);
      // vibe.properties.speechiness.sd.should.eql(0);
    });
  });
  describe("/POST/:id/topTracks", () => {
    it("should return a top Tracks for a room that fit the vibe", async () => {
      // if failing, check if token has expired
      let err,
        res = null;
      const room = {
        name: "Test",
        userId: "someUser",
        playlist: [{ uri: "spotify:track:123" }]
      };
      [err, res] = await to(
        chai
          .request(server)
          .post("/api/rooms")
          .send(room)
      );

      const id = res.body.room.id;
      [err, res] = await to(
        chai
          .request(server)
          .post(`/api/room/${id}/topTracks`)
          .send({
            roomId: id,
            accessToken: token,
            userId: "james",
            uris: ["11dFghVXANMlKmJXsNCbNl"]
          })
      );

      const topTracks = res.body;

      topTracks[0].userId.should.eql("james");
      topTracks[0].tracks[0].should.have.property("danceability");
      topTracks[0].tracks[0].should.have.property("energy");
      topTracks[0].tracks[0].should.have.property("uri");
      topTracks[0].tracks[0].should.have.property("acousticness");
      topTracks[0].tracks[0].should.have.property("tempo");
      topTracks[0].tracks[0].should.have.property("key");
      topTracks[0].tracks[0].should.have.property("mode");
    });
  });
});
