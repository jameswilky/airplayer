const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");

/* This is the data access object for the room model*/
module.exports = {
  getRoom: async room => {
    let err;
    [err, room] = await to(Room.findById(room.id));
    return err ? null : JSON.parse(JSON.stringify(room));
  },
  updateRoom: async updatedRoom => {
    let err, result;
    [err, room] = await to(Room.findById(updatedRoom._id));
    if (err) return null;
    else {
      [err, result] = await to(Object.assign(room, updatedRoom).save());
      return err ? null : JSON.parse(JSON.stringify(result));
    }
  }
};
