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

const validateEvent = require("../../server/middleware/validateEvent");

describe.only("validateEvent", () => {
  const validPayloads = [
    { uri: "spotify:track:12h309123" },
    { uri: "spotify:track:098127340192834" },
    { uri: "spotify:track:lkajsldf" }
  ];
  const invalidPayloads = [
    "123",
    "spotify:track:123",
    "spotify:123",
    "track:123",
    "spotify:track:",
    { uri: "123" },
    { uri: "spotify:track:" },
    { uri: "spotify:123" },
    { uri: "track:123" },
    { uri: "spotify:track:123:" }
  ];
  it("will return a string when an invalid payload is entered", () => {
    const results = invalidPayloads.map(payload =>
      validateEvent(null, { type: "ADD_TRACK", payload })
    );

    results.forEach(result => expect(result).to.be.a("string"));
  });
  it("will return null when an valid payload is entered", () => {
    const results = validPayloads.map(payload =>
      validateEvent(null, { type: "ADD_TRACK", payload })
    );
    results.forEach(result => expect(result).to.eql(null));
  });
});
