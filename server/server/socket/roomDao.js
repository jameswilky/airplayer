const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");

/* This is the data access object for the room model*/
module.exports = {
  getRoom: async targetRoom => {
    const [err, room] = await to(Room.findById(targetRoom.id));
    return err ? null : room;
  },
  addTrack: async (targetRoom, track) => {
    const [err, room] = await to(Room.findById({ _id: targetRoom.id }));
    if (err) return [err, null];
    else {
      return await to(room.playlist.push(track).save());
    }
  },
  removeTrack: (room, track) => {},
  updatePlayist: (room, playlist) => {},
  pause: room => {},
  play: room => {},
  addMember: room => {},
  removeMember: (room, socket) => {}
};
