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
      if (
        isInvalidTrack(payload) ||
        isInPlaylist(payload.uri, state.playlist)
      ) {
        return "ADD_TRACK failed. track URI is invalid";
      }
    }
    default:
      return null;
  }
};
