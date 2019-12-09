// Room route handlers
const mongoose = require("mongoose");
const Room = require("../models/Room");
const to = require("../helpers/to");
const { createHost } = require("../daos/hostDao");

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
  }
};
