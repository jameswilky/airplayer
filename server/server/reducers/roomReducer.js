const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST
} = require("../actions/actions");

const dispatch = (state, { type, payload }) => {
  // todo add validation
  switch (type) {
    case ADD_TRACK:
      return { ...state, playlist: [...state.playlist, payload] };

    case REMOVE_TRACK:
      return {
        ...state,
        playlist: state.playlist.filter(track => {
          return track.trackId !== payload.trackId;
        })
      };
    default:
      return state;
  }
};

module.exports = dispatch;
