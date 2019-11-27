const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST,
  RESUME,
  SEEK
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
          return track.uri !== payload.uri;
        })
      };

    case PLAY:
      return {
        ...state,
        currentSong: { playing: true, uri: payload.uri, lastSeek: 0 }
      };

    case SEEK:
      return {
        ...state,
        currentSong: { ...state.currentSong, lastSeek: payload }
      };
    case RESUME:
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          playing:
            state.currentSong.uri === (null || undefined) ? false : true
        }
      };

    case PAUSE:
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          playing: false,
          uri: state.currentSong.uri
        }
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
