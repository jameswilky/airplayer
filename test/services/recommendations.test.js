const { createVibe } = require("../../server/services/recommendations");

describe("recommendations service", () => {
  describe("createVibe", () => {
    it.only("returns a vibe object", () => {
      const features = [
        { a: 0.2, b: 1, c: 0.9 },
        { a: 0.3, b: 1, c: 0.2 },
        { a: 0.2, b: 1, c: 0.8 },
        { a: 0.1, b: 1, c: 0.3 },
        { a: 0.2, b: 0.1, c: 0.7 },
        { a: 0.8, b: 0.5, c: 0.3 },
        { a: 0.9, b: 0.2, c: 0.1 }
      ];

      const vibe = createVibe(features);
      console.log(vibe);
    });
  });
});
