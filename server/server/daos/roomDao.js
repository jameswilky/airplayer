/* This is the data access object for the room model*/
const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");

module.exports = {
  createRoom: async (
    name,
    playlist = [],
    currentSong = { playing: false, trackId: null }
  ) => {
    const newRoom = new Room({
      name: name,
      playlist: playlist,
      currentSong: currentSong,
      createdAt: new Date()
    });

    const [err, room] = await to(newRoom.save());
    return err || room === null ? null : room.toClient();
  },
  getRoom: async id => {
    let err, roomModel;
    [err, roomModel] = await to(Room.findById(id));
    // TODO add validation and write test to check value of roomModel and err
    return err || roomModel === null ? null : roomModel.toClient();
  },
  updateRoom: async nextRoom => {
    let err, updatedRoomModel, roomModel;
    [err, roomModel] = await to(Room.findById({ _id: nextRoom.id }));
    if (err) return null;
    else {
      [err, updatedRoomModel] = await to(
        Object.assign(roomModel, nextRoom).save()
      );
      return err || roomModel === null ? null : roomModel.toClient();
    }
  }
};
