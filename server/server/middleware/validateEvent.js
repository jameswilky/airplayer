const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST,
  RESUME,
  SEEK
} = require("../actions/actions");
// TODO use regex
module.exports = (state, { type, payload }) => {
  switch (type) {
    case ADD_TRACK: {
      const error = "ADD_TRACK failed. payload is not a track";
      if (!payload.uri) {
        return error;
      }
      const uri = payload.uri.split(":");
      console.log(uri);
      if (
        uri.length !== 3 ||
        uri[0] !== "spotify" ||
        uri[1] !== "track" ||
        uri[2] !== ""
      ) {
        return error;
      }
    }
    default:
      return null;
  }
};
