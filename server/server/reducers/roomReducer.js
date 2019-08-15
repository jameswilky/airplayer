const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST
} = require("../actions/actions");

const dispatch = (state, { type, payload }) => {
  // TODO add validation
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

    case PLAY:
      return {
        ...state,
        currentSong: { playing: true, trackId: payload.trackId }
      };

    case PAUSE:
      return {
        ...state,
        currentSong: { playing: false, trackId: state.currentSong.trackId }
      };

    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: payload
      };

    default:
      return state;
  }
};

module.exports = dispatch;
