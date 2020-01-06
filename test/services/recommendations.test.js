const { createVibe } = require("../../server/services/recommendations");

describe("recommendations service", () => {
  describe.only("createVibe", () => {
    it("rejects invalid objects", () => {});
    it("averages the properties within the vibe object", () => {});
    it("returns a vibe object", () => {
      const features = [
        {
          acousticness: 0.2,
          danceability: 1,
          energy: 0.9,
          instrumentalness: 0.2,
          liveness: 0.1,
          speechiness: 0.6,
          valence: 0.2
        }
      ];

      const vibe = createVibe(features);
      console.log(vibe);
    });
  });
});
