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
  "BQDIQv4nYOEP9N8j7bA9m2f7Q8T0rRU3HkncaEJNsaXG3-7PbAL8C6ipATXEM7Bed-J2wJpi61xxnm34NT7vSC2tKPeZmpNBfJXiLrYuVlti_z7erQpHs2NQ-JTOyyRIM9brmsGQiw8zxTSGh0RQbPZj2Tg4TOkuFx-E7VdPAMtcFS1L9Cf9khNbXR9SEbq9Ts4M";

const createInitializedRoom = async (initTracks, newTracks) => {
  let err,
    res = null;
  // Create room
  const room = {
    name: "Test",
    userId: "someUser",
    playlist: initTracks.map(id => {
      return { uri: `spotify:track:${id}` };
    })
  };
  [err, res] = await to(
    chai
      .request(server)
      .post("/api/rooms")
      .send(room)
  );
  const id = res.body.room.id;

  // Initialize vibe
  [err, res] = await to(
    chai
      .request(server)
      .post(`/api/room/${id}/vibe`)
      .send({
        roomId: id,
        accessToken: token,
        tracks: initTracks.map(id => {
          return { uri: `spotify:track:${id}` };
        })
      })
  );
  // Add top tracks
  [err, res] = await to(
    chai
      .request(server)
      .post(`/api/room/${id}/topTracks`)
      .send({
        roomId: id,
        accessToken: token,
        userId: "james",
        tracks: newTracks.map(id => {
          return { uri: `spotify:track:${id}` };
        })
      })
  );

  return res.body;
};

const exampleTracks = {
  /* Dancy hip hop*/
  dancyHipHop: [
    "7iL6o9tox1zgHpKUfh9vuC" /* 50 cent - in da club*/,
    "5D2mYZuzcgjpchVY1pmTPh" /* 50 cent - candy shop*/,
    "4nva9EpKntUTs6CRSGBCn9" /* 50 cent - just a lil bit */
  ],
  dubstep: [
    "5q8oybjZelukF4h0CzSUN9" /* Skrillex - scary monsters nice sprites */,
    "6VRhkROS2SZHGlp0pxndbJ" /* skrillex - bangarang*/,
    "3FUZpoj9VV0sgc8RqbS3xQ" /* skrillex - kyoto */
  ],
  classical: [
    "6Lg0gTip66HTGCw2x1nAIz" /* Bach - "Brandenburg Concerto No. 1 in F Major, BWV 1046: I. Allegro"*/,
    "6mqBqrnQof1QzRLu71mRjv" /* Bach - "Orchestral Suite No. 3 in D Major, BWV 1068: II. Air"*/,
    "5DLqQnaWF2oapXgciUDRuw" /* Bach - "Brandenburg Concerto No. 2 in F Major, BWV 1047: III. Allegro assai"*/
  ]
};
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
            tracks: exampleTracks.dubstep.map(id => {
              return { uri: `spotify:track:${id}` };
            })
          })
      );

      const vibe = res.body;

      if (vibe === undefined) console.log("Check if token has expired");

      vibe.properties.danceability.mean.should.eql(0.6163333333333334);
      vibe.properties.speechiness.sd.should.eql(0.05442893429866957);
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
            tracks: exampleTracks.dubstep.map(id => {
              return { uri: `spotify:track:${id}` };
            })
          })
      );
      const topTracks = res.body.recommendations.topTracks;
      topTracks[0].userId.should.eql("james");
      topTracks[0].tracks[0].properties.should.have.property("danceability");
      topTracks[0].tracks[0].properties.should.have.property("energy");
      topTracks[0].tracks[0].should.have.property("uri");
      topTracks[0].tracks[0].properties.should.have.property("acousticness");
    });
  });
  describe("/GET/:id/recommended", () => {
    it("should return a recommended playlist", async () => {
      const room = await createInitializedRoom(
        exampleTracks.dancyHipHop,
        exampleTracks.dancyHipHop
      );
      const [err, res] = await to(
        chai.request(server).get(`/api/room/${room._id}/recommended`)
      );

      res.body.selected.length.should.eql(3);
    });
  });
  describe("Recommendation pipeline", () => {
    it("given a dancyhiphop vibe it recommend all dancyhiphop tracks", async () => {
      const room = await createInitializedRoom(
        exampleTracks.dancyHipHop,
        exampleTracks.dancyHipHop
      );

      const playlist = room.recommendations.playlist.selected;
      playlist.length.should.eql(3);
    });
    it("given a dancyhiphop vibe it recommend no classical tracks", async () => {
      const room = await createInitializedRoom(
        exampleTracks.dancyHipHop,
        exampleTracks.classical
      );

      const playlist = room.recommendations.playlist.selected;
      playlist.length.should.eql(0);
    });
    it("given a classical vibe it recommend all classical tracks", async () => {
      const room = await createInitializedRoom(
        exampleTracks.classical,
        exampleTracks.classical
      );

      const playlist = room.recommendations.playlist.selected;
      playlist.length.should.eql(3);
    });
    it("given a dubstep vibe it recommend all dubstep tracks", async () => {
      const room = await createInitializedRoom(
        exampleTracks.dubstep,
        exampleTracks.dubstep
      );

      const playlist = room.recommendations.playlist.selected;
      playlist.length.should.eql(3);
    });
    it("given a dubstep vibe it recommend no classical tracks", async () => {
      const room = await createInitializedRoom(
        exampleTracks.dubstep,
        exampleTracks.classical
      );

      const playlist = room.recommendations.playlist.selected;
      playlist.length.should.eql(0);
    });
  });
});
