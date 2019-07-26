//  Dependencies
const expect = require("chai").expect;
const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST
} = require("../../server/actions/actions");

// Helpers
const diff = require("../../server/helpers/diff");

// Test subject
const dispatch = require("../../server/reducers/roomReducer");

// Mock data
const birthday = {
  id: "123",
  name: "birthday",
  playlist: [{ trackId: "123" }, { trackId: "456" }],
  currentSong: { playing: true, trackId: "123" }
};

describe("Room Reducer", () => {
  describe("ADD_TRACK", () => {
    it("adds a track", () => {
      const action = { type: ADD_TRACK, payload: { trackId: "789" } };
      const result = dispatch(birthday, action);

      expect(result.playlist.length).to.eql(3);
      expect(result.playlist[2].trackId).to.eql(action.payload.trackId);
    });
  });
  describe("REMOVE_TRACK", () => {
    it("removes a track if it exists in the playlist", () => {
      const action = { type: REMOVE_TRACK, payload: { trackId: "123" } };
      console.log(action);
      const result = dispatch(birthday, action);
      console.log(birthday, result);
      expect(result.playlist.length).to.eql(1);
      expect(result.playlist[0].trackId).to.eql("456");
    });
    it("returns the original state if the track is not found", () => {
      const action = { type: REMOVE_TRACK, payload: { trackId: "789" } };
      const result = dispatch(birthday, action);

      expect(diff(birthday, result)).to.be.deep.eql({});
    });
  });
});
