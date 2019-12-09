//  Dependencies
const expect = require("chai").expect;
const {
  ADD_TRACK,
  REMOVE_TRACK,
  PLAY,
  PAUSE,
  UPDATE_PLAYLIST,
  RESUME,
  SEEK
} = require("../../server/actions/actions");

// Helpers
const diff = require("../../server/helpers/diff");

// Test subject
const dispatch = require("../../server/reducers/roomReducer");

// Mock data
const birthday = {
  id: "123",
  name: "birthday",
  playlist: [{ uri: "123" }, { uri: "456" }],
  currentSong: { playing: true, uri: "123", lastSeek: 0 }
};

describe("Room Reducer", () => {
  describe("ADD_TRACK", () => {
    it("adds a track", () => {
      const action = { type: ADD_TRACK, payload: { uri: "789" } };
      const result = dispatch(birthday, action);

      expect(result.playlist.length).to.eql(3);
      expect(result.playlist[2].uri).to.eql(action.payload.uri);
    });
  });
  describe("REMOVE_TRACK", () => {
    it("removes a track if it exists in the playlist", () => {
      const action = { type: REMOVE_TRACK, payload: { uri: "123" } };
      const result = dispatch(birthday, action);

      expect(result.playlist.length).to.eql(1);
      expect(result.playlist[0].uri).to.eql("456");
    });
    it("returns the original state if the track is not found", () => {
      const action = { type: REMOVE_TRACK, payload: { uri: "789" } };
      const result = dispatch(birthday, action);

      expect(diff(birthday, result)).to.be.deep.eql({});
    });
  });

  describe("PLAY", () => {
    it("should set currentTrack.playing to true", () => {
      const action = { type: PLAY, payload: { uri: "123" } };
      const result = dispatch(birthday, action);

      expect(result.currentSong.playing).to.eql(true);
    });

    it("should set the currentTrack.uri to the given uri", () => {
      const action = { type: PLAY, payload: { uri: "123" } };
      const result = dispatch(birthday, action);
      expect(result.currentSong.uri).to.eql(action.payload.uri);
    });
    it("should set lastSeek to 0", () => {
      birthday.currentSong.lastSeek = 12345;
      const action = { type: PLAY, payload: { uri: "123" } };
      const result = dispatch(birthday, action);
      expect(result.currentSong.lastSeek).to.eql(0);
    });
  });

  describe("PAUSE", () => {
    it("should set currentTrack.playing to false", () => {
      const action = { type: PAUSE, payload: null };
      const result = dispatch(birthday, action);

      expect(result.currentSong.playing).to.eql(false);
      expect(result.currentSong.uri).to.be.a("string");
    });
  });
  describe("RESUME", () => {
    it("should set currentTrack.playing to true", () => {
      birthday.playing = false;
      const action = { type: RESUME, payload: null };
      const result = dispatch(birthday, action);

      expect(result.currentSong.playing).to.eql(true);
      expect(result.currentSong.uri).to.be.a("string");
    });
  });

  describe("UPDATE_PLAYLIST", () => {
    it("should replace the old playlist with a new playlist", () => {
      const newPlaylist = [
        { uri: "3245" },
        { uri: "0983" },
        { uri: "12390" },
        { uri: "90182" }
      ];
      const action = { type: UPDATE_PLAYLIST, payload: newPlaylist };
      const result = dispatch(birthday, action);

      expect(result.playlist.length).to.eql(4);
      expect(result.playlist[0].uri).to.eql("3245");
      expect(result.playlist[3].uri).to.eql("90182");
    });
  });

  describe("SEEK", () => {
    it("should update the last Skipped to the passed value", () => {
      const action = { type: SEEK, payload: 1000 };
      const result = dispatch(birthday, action);

      expect(result.currentSong.lastSeek).to.eql(1000);
    });
  });
});
