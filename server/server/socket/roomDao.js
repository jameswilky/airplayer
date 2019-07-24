const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");

/* This is the data access object for the room model*/
module.exports = {
  getRoom: async targetRoom => {
    const [err, room] = await to(Room.findById(targetRoom.id));
    return err ? null : room;
  },
  updateRoom: async (room, func) => {
    let err, result;
    [err, room] = await to(Room.findById({ _id: room.id }));
    if (err) return null;
    else {
      // const updatedRoom = func(room, payload);
      const updatedRoom = room.playlist.push(track);
      [err, result] = await to(Object.assign(room, updatedRoom).save());
      return err ? null : result;
    }
  },
  removeTrack: (room, track) => {},
  updatePlayist: (room, playlist) => {},
  pause: room => {},
  play: room => {},
  addMember: room => {},
  removeMember: (room, socket) => {}
};
