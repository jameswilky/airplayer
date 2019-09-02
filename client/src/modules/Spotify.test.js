import Spotify from "./Spotify";

const token =
  "BQDMiSyYh_B083wV7I1Mj1y-xUB8pYCNs_EMAsMeSlG3esI0Ff7seEFKZeOeD05HBMHhFK8aDEojVccfNcJIGHajEXv7GSerrHXgup2jcqKK8fYO4YwVoFb44j8qUp_VLVUyUxnBFb8LFUZY2ObeAcpCLNwDzZ60hhfcHexOHUbN-PP7daV5";
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
      expect(query).toBe(`search?q=doom%20metal&type=playlist`);
    });

    it("should create a query to search for tracks available only in a specific market", () => {
      const query = spotify.search({
        query: "abba",
        type: "track",
        market: "US"
      });
      expect(query).toBe("search?q=abba&type=track&market=US");
    });
  });
  describe("find", () => {
    it("should create a query that finds the tracks of an album matching the given id", () => {
      const query = spotify.find({
        tracks: { where: { albums: { id: "6akEvsycLGftJxYudPjmqK" } } }
      });
      expect(query).toBe("albums/6akEvsycLGftJxYudPjmqK/tracks");
    });
    it("should create a query that finds the topTracks of an artist matching the given id", () => {
      const query = spotify.find({
        topTracks: { where: { artist: { id: "43ZHCT0cAZBISjO8DG9PnE" } } }
      });
      expect(query).toBe("artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks");
    });
    it("should create a query that finds the related artists of a given artist ids", () => {
      const query = spotify.find({
        relatedArtists: { where: { artist: { id: "43ZHCT0cAZBISjO8DG9PnE" } } }
      });
      expect(query).toBe("artists/43ZHCT0cAZBISjO8DG9PnE/related-artists");
    });
    it("should create a query that finds several atists matching the given ids", () => {
      const query = spotify.find({
        artists: {
          where: { ids: ["0oSGxfWSnnOXhD2fKuz2Gy", "3dBVyJ7JuOMt4GE9607Qin"] }
        }
      });
      expect(query).toBe(
        "artists?ids=0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin"
      );
    });

    it("should create a query that finds several tracks matching the given ids", () => {
      const query = spotify.find({
        tracks: {
          where: {
            ids: [
              "11dFghVXANMlKmJXsNCbNl",
              "20I6sIOMTCkB6w7ryavxtO",
              "7xGfFoTpQ2E7fRF5lN10tr"
            ]
          }
        }
      });

      expect(query).toBe(
        "tracks?ids=11dFghVXANMlKmJXsNCbNl,20I6sIOMTCkB6w7ryavxtO,7xGfFoTpQ2E7fRF5lN10tr"
      );
    });
    it("should create a query that finds a single track matching the given id", () => {
      const query = spotify.find({
        tracks: {
          where: {
            id: "11dFghVXANMlKmJXsNCbNl"
          }
        }
      });
      expect(query).toBe("tracks/11dFghVXANMlKmJXsNCbNl");
    });
  });
});
