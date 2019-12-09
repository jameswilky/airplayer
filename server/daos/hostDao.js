/* This is the data access object for the host model*/
const mongoose = require("mongoose");
const Host = require("../models/Host");
const to = require("../helpers/to");
const uuid = require("uuid/v4");

module.exports = {
  createHost: async ({ spotifyUserId, roomId }) => {
    const newHost = new Host({
      spotifyUserId: spotifyUserId,
      roomId: roomId,
      token: uuid(),
      createdAt: new Date()
    });
    const [err, host] = await to(newHost.save());
    return err || host === null ? null : host.toClient();
  },
  tokenIsValid: async ({ roomId, token }) => {
    const [err, room] = await to(Host.findOne({ roomId }));
    return err ? null : room.token === token ? true : false;
  },
  getHostById: async id => {
    const [err, host] = await to(Host.findById(id));
    return err || host === null ? null : host.toClient();
  },
  getHostBySpotifyUserId: async spotifyUserId => {
    // TODO add room ID to makesure that if a spotify user somehow has 2 rooms the correct one is returned
    const [err, host] = await to(Host.findOne({ spotifyUserId }));
    return err || host === null ? null : host.toClient();
  }
};
