// Room route handlers
const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");
const { createHost } = require("../daos/hostDao");
const {
  getAudioFeatures,
  createVibe,
  filterTracksByVibe,
  calculateSimilarity
} = require("../services/recommendations");

const vibeIsValid = room => {
  if (
    room &&
    room.recommendations &&
    room.recommendations.vibe &&
    room.recommendations.vibe.properties
  ) {
    const props = room.recommendations.vibe.properties;
    return Object.keys(room.recommendations.vibe.properties).some(
      key =>
        props[key].hasOwnProperty("mean") &&
        props[key].hasOwnProperty("variance") &&
        props[key].hasOwnProperty("sd")
    );
  } else return false;
};

// Refactor this to not include and information related to requests and responses
module.exports = {
  getRooms: async (req, res) => {
    const [err, rooms] = await to(Room.find({}));
    err ? res.send(err) : res.json(rooms.map(room => room.toClient()));
  },
  createRoom: async (req, res) => {
    try {
      req.body = JSON.parse(req.body);
    } catch (err) {}

    // Temp pass this in on request or use roomdao
    if (!req.body.playlist) res.send({ error: "No playlist was passed" });
    req.body.currentSong = { playing: false, uri: req.body.playlist[0].uri };

    if (!req.body.userId) res.send({ error: "user id required" });
    const newRoom = new Room(req.body);
    const [err, room] = await to(newRoom.save());
    const { token } = await createHost({
      spotifyUserId: req.body.userId,
      roomId: room._id
    });
    err
      ? res.send(err)
      : res.json({
          message: `Room created`,
          room: room.toClient(),
          token: token
        });
  },

  getRoom: async (req, res) => {
    const [err, room] = await to(Room.findById(req.params.id));
    err ? res.send(err) : res.json(room.toClient());
  },
  updateRoom: async (req, res) => {
    let err, room;
    [err, room] = await to(Room.findById({ _id: req.params.id }));
    if (err) res.send(err);
    else {
      [err, room] = await to(Object.assign(room, req.body).save());
      err
        ? res.send(err)
        : res.json({ message: "Room updated", room: room.toClient() });
    }
  },
  deleteRoom: async (req, res) => {
    const [err, result] = await to(Room.deleteOne({ _id: req.params.id }));
    err ? res.send(err) : res.json({ message: "Room deleted", result });
  },

  initializeVibe: async (roomId, accessToken, uris) => {
    const [{ audio_features }, [err, room]] = await Promise.all([
      getAudioFeatures(uris, accessToken),
      to(Room.findById(roomId))
    ]);

    if (!audio_features || audio_features.error || err)
      return [err || null, null];

    // TODO fix that only the first element is being passed
    const vibe = createVibe(audio_features);
    Object.assign(room.recommendations.vibe, vibe);
    const [dbError, updatedRoom] = await to(room.save());
    return err || dbError ? null : updatedRoom.recommendations.vibe;
  },
  updateRecommendations: async (room, accessToken) => {
    // PRIVATE
    const { playlist, topTracks, vibe } = room.recommendations;
    playlist.selected = filterTracksByVibe(topTracks, vibe);
    // playlist.generated = await recommendTracks(playlist.selected, accessToken)
    return room;
  },
  addUserTracks: async function(roomId, accessToken, uris, userId) {
    const [{ audio_features }, [findRoomErr, room]] = await Promise.all([
      getAudioFeatures(uris, accessToken),
      to(Room.findById(roomId))
    ]);
    if (!audio_features || audio_features.error || findRoomErr)
      return [findRoomErr || null, null];

    if (room.recommendations.topTracks.length > 0) {
      Object.assign(
        room.recommendations.topTracks.find(user => user.userId === userId)
          .tracks,
        audio_features
      );
    } else {
      room.recommendations.topTracks.push({ userId, tracks: audio_features });
    }

    if (vibeIsValid(room)) {
      Object.assign(
        room.recommendations.topTracks,
        calculateSimilarity(
          room.recommendations.topTracks,
          room.recommendations.vibe
        )
      );
      Object.assign(room, await this.updateRecommendations(room, accessToken));
    }
    const [dbSaveErr, updatedRoom] = await to(room.save());

    return dbSaveErr || updatedRoom === null
      ? null
      : updatedRoom.recommendations.topTracks;
  },

  updateVibe: async function(req, res) {
    // takes in room id and list of tracks
    // get room from db
    // cosnt features = getAudioFeatures(tracks)
    // const nextVibe = mergeVibe(room.vibe,features)
    // save vibe to db
    // this.updateRecommendations()
  }
};

/* 
Client operations

on creation: initializeVibe, addUserTrack
on user joined: addUserTracks
on track added: update vibe 
*/
