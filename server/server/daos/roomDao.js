/* This is the data access object for the room model*/
const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");

module.exports = {
  createRoom: async ({
    name,
    playlist = [],
    currentSong = { playing: false, trackId: null },
    password = null
  }) => {
    const newRoom = new Room({
      name: name,
      playlist: playlist,
      currentSong: currentSong,
      createdAt: new Date(),
      password: password,
      requiresPassword: password === null ? false : true
    });

    const [err, room] = await to(newRoom.save());
    return err || room === null ? null : room.toClient();
  },
  passwordDoesMatch: async ({ roomId, password = null }) => {
    const [err, room] = await to(Room.findById(roomId));
    return err || room === null
      ? null // If room found return null
      : room.password === undefined
      ? true // If no password required, then return true
      : room.password === password
      ? true // If password matches return true
      : false; // if doesn't match return false
  },

  getRoom: async id => {
    let err, roomModel;
    [err, roomModel] = await to(Room.findById(id));
    // TODO add validation and write test to check value of roomModel and err
    return err || roomModel === null ? null : roomModel.toClient();
  },

  updateRoom: async room => {
    let err, oldRoom, nextRoom;

    // Search for room, to get old password
    [err, oldRoom] = await to(Room.findById(room.id));

    // if not found, return null
    if (err) return null;

    // Override incoming room with old password
    room.password = oldRoom.password;

    // find and update room
    [err, nextRoom] = await to(
      Room.findByIdAndUpdate(room.id, { $set: room }, { new: true })
      // option.new needs to be set to true to make sure new object is being returned .
      // source:https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model
    );
    return err || nextRoom === null ? null : nextRoom.toClient();
  }
};
