const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("./to");

module.exports = async ({ name, playlist, currentSong, host }) => {
  try {
    const newRoom = new Room({
      name: name,
      playlist: playlist,
      currentSong: currentSong,
      createdAt: new Date(),
      host: host
    });

    [err, room] = await to(newRoom.save());
    if (err)
      throw "failed to create mock room : Error saving new room to database";
    return room.toClient();
  } catch (e) {
    console.log(e);
  }
};
