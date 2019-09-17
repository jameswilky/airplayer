import { searchQueryResults } from "./testData.js";
import SpotifyHelper from "./SpotifyHelper";

const { threeTracks } = searchQueryResults;

describe("SpotifyHelper", () => {
  describe("getItems", () => {
    it("should return a list of items for a given list of tracks", () => {
      const items = SpotifyHelper(threeTracks).getItems();
      expect(typeof items).toBe("object");
      expect(items.tracks instanceof Array).toBe(true);
      expect(items.tracks.length).toEqual(3);
    });
  });
});
