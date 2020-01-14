export default (state, action) => {
  switch (action.type) {
    case "SET_DEVICE":
      return {
        ...state,
        id: action.payload.device_id,
        ready: action.payload.ready
      };

    case "UPDATE_PLAYER": {
      const roomState = action.payload.roomState;
      return {
        ...state,
        currentSong: roomState.currentSong.uri,
        paused: !roomState.currentSong.playing,
        playlist: roomState.playlist
          .map(track => track.uri)
          .concat(
            roomState.recommendations.playlist.selected.map(track => track.uri),
            roomState.recommendations.playlist.generated.map(track => track.uri)
          ),

        lastSeek: roomState.currentSong.lastSeek
      };
    }
    default:
      return state;
  }
};
