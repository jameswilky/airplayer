const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST
} = require("./actions");

// This defines which user types can access certain actions
module.exports = {
  ALL: { ADD_TRACK },
  HOST: { REMOVE_TRACK, PLAY, PAUSE, UPDATE_PLAYLIST },
  CLIENT: null
};