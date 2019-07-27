/* This is the data access object for the room model*/

const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");
const objectify = require("../helpers/objectify");

module.exports = {
  getRoom: async id => {
    let err, roomModel;
    [err, roomModel] = await to(Room.findById(id));
    // todo add validation
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
