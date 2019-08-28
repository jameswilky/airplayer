import Spotify from "./Spotify";

const token =
  "BQDFfTywYCP7zNuKFuu_u9sn4iRV_z9OTBZFm6e_iDO9SX2t01-5YDF-tuUz9-d30K6QcIAzn5GyayrNlaILOXi-5l3ivMQ5So2Fbj4nLeJygIlvH0skg2RjlCZhUJY8kHHnddr6XF-tcOWmIa9pMPj2D02JfMZzHco2Nw3F01-hx2UnmNN8";
const api = "https://api.spotify.com/v1/";

const spotify = Spotify(token, false);

describe("Spotify Web API Module", () => {
  describe("search", () => {
    it("should create a query to search for an artist", () => {
      const query = spotify.search({
        query: "tania bowra",
        type: "artist"
      });
      expect(query).toBe("search?q=tania%20bowra&type=artist");
    });
    it("should create a query to search for an artist using a wildcard", () => {
      const query = spotify.search({
        query: "tania",
        type: "artist",
        wildcard: true
      });

      expect(query).toBe("search?q=tania*&type=artist");
    });
    it("should create a query to search for artists matching a given name, offset and limit", () => {
      const query = spotify.search({
        query: "bob",
        type: "artist",
        limit: 2,
        offset: 20
      });
      expect(query).toBe("search?q=bob&type=artist&limit=2&offset=20");
    });

    it("should create a query to search for albums matching a given name and a given artist", () => {
      const query = spotify.search({
        query: { album: "arrival", artist: "abba" },
        type: "album"
      });

      expect(query).toBe("search?q=album:arrival%20artist:abba&type=album");
    });
    it("should create a query to search for an album by a specifif UPC code", () => {
      const query = spotify.search({
        query: { upc: "00602537817016" },
        type: "album"
      });

      expect(query).toBe("search?q=upc:00602537817016&type=album");
    });
    it("should create a query to search for playlists matching a given name or description matching a string", () => {
      const query = spotify.search({
        query: "doom metal",
        type: "playlist"
      });
      console.log(query);
      expect(query).toBe(`search?q="doom metal"&type=playlist"`);
    });
  });
});
