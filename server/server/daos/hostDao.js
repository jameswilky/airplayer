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
  getHostById: async id => {
    const [err, host] = await to(Host.findById(id));
    return err || host === null ? null : host.toClient();
  },
  getHostBySpotifyUserId: async spotifyUserId => {
    const [err, host] = await to(Host.findOne({ spotifyUserId }));
    return err || host === null ? null : host.toClient();
  }
};
