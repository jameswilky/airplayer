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
      const re = /spotify:track:[$\d|$\w]+/;
      if (
        !payload.uri ||
        !re.test(payload.uri) ||
        !/\w/.test(payload.uri[payload.uri.length - 1])
      ) {
        return "ADD_TRACK failed. payload is not a valid track uri";
      }
    }
    default:
      return null;
  }
};
