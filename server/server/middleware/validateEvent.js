const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST,
  RESUME,
  SEEK
} = require("../actions/actions");
module.exports = (state, { type, payload }) => {
  switch (type) {
    case ADD_TRACK: {
      const error = "ADD_TRACK failed. payload is not a track";
      if (!payload.trackId) {
        return error;
      }
      const uri = payload.trackId.split(":");
      if (uri.length !== 3 && uri[0] !== "spotify" && uri[1] !== "track") {
        return error;
      }
    }
    default:
      return null;
  }
};
