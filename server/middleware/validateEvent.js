const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST,
  RESUME,
  SEEK
} = require("../actions/actions");

const isInvalidTrack = payload =>
  !payload.uri ||
  !/spotify:track:[$\d|$\w]+/.test(payload.uri) ||
  !/\w/.test(payload.uri[payload.uri.length - 1]);

const isInPlaylist = (uri, playlist) =>
  playlist.find(track => track.uri === uri);

// TODO use regex
module.exports = (state, { type, payload }) => {
  switch (type) {
    case ADD_TRACK: {
      if (isInvalidTrack(payload)) {
        return "ADD_TRACK failed. track URI is invalid";
      }
      if (isInPlaylist(payload.uri, state.playlist)) {
        return "ADD_TRACK failed. track is already in playlist";
      }
      return null;
    }
    case REMOVE_TRACK: {
      if (!isInPlaylist(payload.uri, state.playlist)) {
        return "REMOVE_TRACK failed. track is not in playlist";
      }
      return null;
    }
    case SEEK: {
      if (typeof payload !== "number") {
        return "SEEK failed. payload passed was not an integer";
      }
      return null;
    }

    default:
      return null;
  }
};
