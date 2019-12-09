import { searchQueryResults } from "./testData.js";
import SpotifyHelper from "./SpotifyHelper";

const {
  threeTracks,
  threeTracksWithNoImages,
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
    it("should return an object of images for a given track", () => {
      const images = SpotifyHelper(threeTracks)
        .getItems()
        .tracks[0].getImages();
      expect(images.small.height).toEqual(64);
    });
    it("should return an object of images for a given artist", () => {
      const images = SpotifyHelper(threeArtists)
        .getItems()
        .artists[0].getImages();
      expect(images.small.height).toEqual(160);
    });
    it("should return an object of images for a given playlist", () => {
      const images = SpotifyHelper(threePlaylists)
        .getItems()
        .playlists[0].getImages();
      expect(images.default.url).toEqual(
        "https://thisis-images.scdn.co/37i9dQZF1DZ06evO2RVL6m-default.jpg"
      );
    });
    it("should return an object of images for a given album", () => {
      const images = SpotifyHelper(threeAlbums)
        .getItems()
        .albums[0].getImages();
      expect(images.large.url).toEqual(
        "https://i.scdn.co/image/354aa96c91e25bb43cc39e27e0aee457ea513558"
      );
    });
    it("should return an object of fallbackimages for a given track if no images exist", () => {
      const images = SpotifyHelper(threeTracksWithNoImages)
        .getItems()
        .tracks[0].getImages();
      expect(images.default.height).toEqual(500);
      expect(images.small.width).toEqual(64);
    });
  });
});
