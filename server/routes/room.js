// Room route handlers
const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");
const { createHost } = require("../daos/hostDao");
const {
  getAudioFeatures,
  createVibe,
  getSimilarTracks,
  calculateSimilarity,
  recommendTracks
} = require("../services/recommendations");

const getIdsFromTracks = tracks => tracks.map(track => track.uri.split(":")[2]);
const toTrack = audio_features =>
  audio_features.map(features => {
    return {
      uri: features.uri,
      id: features.id,
      similarity: null,
      properties: {
        acousticness: features.acousticness,
        danceability: features.danceability,
        energy: features.energy,
        instrumentalness: features.instrumentalness,
        liveness: features.liveness,
        speechiness: features.speechiness,
        valence: features.valence
      }
    };
  });

const vibeIsValid = room => {
  if (
    room &&
    room.recommendations &&
    room.recommendations.vibe &&
    room.recommendations.vibe.properties &&
    room.recommendations.vibe.properties.acousticness &&
    room.recommendations.vibe.properties.acousticness.mean
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

  initializeVibe: async (roomId, accessToken, tracks) => {
    const ids = getIdsFromTracks(tracks);
    const [{ audio_features }, [err, room]] = await Promise.all([
      getAudioFeatures(ids, accessToken),
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
  updateRecommendations: async (roomModel, accessToken) => {
    const newRoom = roomModel.toObj();
    const topTracks = calculateSimilarity(
      newRoom.recommendations.topTracks,
      newRoom.recommendations.vibe
    );

    // Merge top tracks to room model
    Object.assign(roomModel.recommendations.topTracks, topTracks);
    roomModel.recommendations.playlist.selected = getSimilarTracks(
      topTracks,
      0.6
    ).slice(0, 10);
    // get last 5 elements from playlist
    const ids = getIdsFromTracks(roomModel.playlist).slice(
      Math.max(this.length - 5, 1)
    );
    const recommendations = await recommendTracks(ids, accessToken);

    roomModel.recommendations.playlist.generated = recommendations.tracks.map(
      track => {
        return { uri: track.uri };
      }
    );
    return roomModel;
  },
  addUserTracks: async function(roomId, accessToken, tracks, userId) {
    const ids = getIdsFromTracks(tracks);
    // Get audio features of topTracks from Spotify, and also find room entry in DB
    const [{ audio_features }, [findRoomErr, room]] = await Promise.all([
      getAudioFeatures(ids, accessToken),
      to(Room.findById(roomId))
    ]);
    if (!audio_features) return [{ error: "invalid token" }, null];
    if (audio_features.error || findRoomErr) return [findRoomErr || null, null];
    // Add new tracks and audio analysis too room model
    // if user has already added top tracks, disallow adding more
    if (room.recommendations.topTracks.some(user => user.userId === userId))
      return [null, room.toObj()];
    // Otherwise add users tracks to topTracks
    if (room.recommendations.topTracks.length > 0) {
      Object.assign(
        room.recommendations.topTracks.find(user => user.userId === userId)
          .tracks,
        toTrack(audio_features)
      );
    } else {
      room.recommendations.topTracks.push({
        userId,
        tracks: toTrack(audio_features)
      });
    }

    // If vibe has been initialized, update recommendations
    if (vibeIsValid(room)) {
      Object.assign(room, await this.updateRecommendations(room, accessToken));
    }

    const [dbSaveErr, updatedRoom] = await to(room.save());
    return dbSaveErr || updatedRoom === null ? null : updatedRoom.toObj();
  },

  getRecommendedPlaylist: async roomId => {
    const [err, room] = await to(Room.findById(roomId));
    if (err) return [err, null];
    const playlist = room.toObj().recommendations.playlist;
    return [null, playlist];
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
