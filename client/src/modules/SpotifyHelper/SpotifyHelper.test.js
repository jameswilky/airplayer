import { searchQueryResults } from "./testData.js";
import SpotifyHelper from "./SpotifyHelper";

const {
  threeTracks,
  threeAlbums,
  threePlaylists,
  threeArtists
} = searchQueryResults;

describe("SpotifyHelper", () => {
  describe("getItems", () => {
    it("should return a list of items for a given list of tracks", () => {
      const items = SpotifyHelper(threeTracks).getItems();
      expect(typeof items).toBe("object");
      expect(items.tracks instanceof Array).toBe(true);
      expect(items.tracks.length).toEqual(3);
    });
  });
  describe("getArtists", () => {
    it("should return a list of artists that created the track, given a track", () => {
      const artists = SpotifyHelper(threeTracks)
        .getItems()
        .tracks[0].getArtists();
      expect(artists instanceof Array).toBe(true);
      expect(artists[0].name).toEqual("tobi lou");
      expect(artists.length).toEqual(1);
    });
    it("should return a list of artists that created the album, given album", () => {
      const artists = SpotifyHelper(threeAlbums)
        .getItems()
        .albums[0].getArtists();
      expect(artists instanceof Array).toBe(true);
      expect(artists[0].name).toEqual("tobi lou");
      expect(artists.length).toEqual(1);
    });
  });
  describe("getImages", () => {
    it("should return a list of images for a given track", () => {
      const images = SpotifyHelper(threeTracks)
        .getItems()
        .tracks[0].getImages();
      // console.log(images);
    });
  });
});
