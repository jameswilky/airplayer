import Spotify from "./Spotify";

const token =
  "BQDMiSyYh_B083wV7I1Mj1y-xUB8pYCNs_EMAsMeSlG3esI0Ff7seEFKZeOeD05HBMHhFK8aDEojVccfNcJIGHajEXv7GSerrHXgup2jcqKK8fYO4YwVoFb44j8qUp_VLVUyUxnBFb8LFUZY2ObeAcpCLNwDzZ60hhfcHexOHUbN-PP7daV5";
const api = "https://api.spotify.com/v1/";

const spotify = Spotify(token, false);

describe("Spotify Web API Module", () => {
  describe("search", () => {
    it("should  search for an artist", () => {
      const query = spotify.search({
        query: "tania bowra",
        type: "artist"
      });
      expect(query.query).toBe("search?q=tania%20bowra&type=artist");
    });
    it("should search for an artist using a wildcard", () => {
      const query = spotify.search({
        query: "tania",
        type: "artist",
        wildcard: true
      });

      expect(query.query).toBe("search?q=tania*&type=artist");
    });
    it("should search for artists matching a given name, offset and limit", () => {
      const query = spotify.search({
        query: "bob",
        type: "artist",
        limit: 2,
        offset: 20
      });
      expect(query.query).toBe("search?q=bob&type=artist&limit=2&offset=20");
    });

    it("should search for albums matching a given name and a given artist", () => {
      const query = spotify.search({
        query: { album: "arrival", artist: "abba" },
        type: "album"
      });

      expect(query.query).toBe(
        "search?q=album:arrival%20artist:abba&type=album"
      );
    });
    it("should search for an album by a specific UPC code", () => {
      const query = spotify.search({
        query: { upc: "00602537817016" },
        type: "album"
      });

      expect(query.query).toBe("search?q=upc:00602537817016&type=album");
    });
    it("should search for playlists matching a given name or description matching a string", () => {
      const query = spotify.search({
        query: "doom metal",
        type: "playlist"
      });
      expect(query.query).toBe(`search?q=doom%20metal&type=playlist`);
    });

    it("should search for tracks available only in a specific market", () => {
      const query = spotify.search({
        query: "abba",
        type: "track",
        market: "US"
      });
      expect(query.query).toBe("search?q=abba&type=track&market=US");
    });
  });
  describe("find", () => {
    describe("albums", () => {
      it("should find an album matching the given id", () => {
        const query = spotify.find({
          album: { where: { id: "0sNOF9WDwhWunNAHPD3Ba" } }
        });

        expect(query.query).toBe("albums/0sNOF9WDwhWunNAHPD3Ba");
      });
      it("should find the tracks of an album matching the given id", () => {
        const query = spotify.find({
          tracks: { where: { albums: { id: "6akEvsycLGftJxYudPjmqK" } } }
        });
        expect(query.query).toBe("albums/6akEvsycLGftJxYudPjmqK/tracks");
      });
      it("should find the tracks of album matching the given id, add a limit", () => {
        const query = spotify.find({
          tracks: {
            where: { albums: { id: "6akEvsycLGftJxYudPjmqK" } },
            limit: 2
          }
        });
        expect(query.query).toBe(
          "albums/6akEvsycLGftJxYudPjmqK/tracks?limit=2"
        );
      });
    });

    describe("artists", () => {
      it("should find a single artists matching the id", () => {
        const query = spotify.find({
          artists: { where: { id: "0OdUWJ0sBjDrqHygGUXeCF" } }
        });
        expect(query.query).toBe("artists/0OdUWJ0sBjDrqHygGUXeCF");
      });
      it("should find several albums matching the given ids", () => {
        const query = spotify.find({
          albums: {
            where: {
              ids: [
                "41MnTivkwTO3UUJ8DrqEJJ",
                "6JWc4iAiJ9FjyK0B59ABb4",
                "6UXCm6bOO4gFlDQZV5yL37"
              ]
            }
          }
        });

        expect(query.query).toBe(
          "albums?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4,6UXCm6bOO4gFlDQZV5yL37"
        );
      });

      it("should find the topTracks of an artist matching the given id", () => {
        const query = spotify.find({
          topTracks: { where: { artist: { id: "43ZHCT0cAZBISjO8DG9PnE" } } }
        });
        expect(query.query).toBe("artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks");
      });
      it("should find the related artists of a given artist ids", () => {
        const query = spotify.find({
          relatedArtists: {
            where: { artist: { id: "43ZHCT0cAZBISjO8DG9PnE" } }
          }
        });
        expect(query.query).toBe(
          "artists/43ZHCT0cAZBISjO8DG9PnE/related-artists"
        );
      });
      it("should find several atists matching the given ids", () => {
        const query = spotify.find({
          artists: {
            where: { ids: ["0oSGxfWSnnOXhD2fKuz2Gy", "3dBVyJ7JuOMt4GE9607Qin"] }
          }
        });
        expect(query.query).toBe(
          "artists?ids=0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin"
        );
      });
    });

    describe("tracks", () => {
      it("should find the audio analysis for a track matching the given id", () => {
        const query = spotify.find({
          audioAnalysis: { where: { id: "3JIxjvbbDrA9ztYlNcp3yL" } }
        });

        expect(query.query).toBe("audio-analysis/3JIxjvbbDrA9ztYlNcp3yL");
      });
      it("should find the audio features for a track matching the given ids", () => {
        const query = spotify.find({
          audioFeatures: { where: { id: "3JIxjvbbDrA9ztYlNcp3yL" } }
        });

        expect(query.query).toBe("audio-features/3JIxjvbbDrA9ztYlNcp3yL");
      });
      it("should find the audio features for several tracks", () => {
        const query = spotify.find({
          audioFeatures: {
            where: {
              ids: [
                "4JpKVNYnVcJ8tuMKjAj50A",
                "2NRANZE9UCmPAS5XVbXL40",
                "24JygzOLM0EmRQeGtFcIcG"
              ]
            }
          }
        });

        expect(query.query).toBe(
          "audio-features?ids=4JpKVNYnVcJ8tuMKjAj50A,2NRANZE9UCmPAS5XVbXL40,24JygzOLM0EmRQeGtFcIcG"
        );
      });
      it("should find several tracks matching the given ids", () => {
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

        expect(query.query).toBe(
          "tracks?ids=11dFghVXANMlKmJXsNCbNl,20I6sIOMTCkB6w7ryavxtO,7xGfFoTpQ2E7fRF5lN10tr"
        );
      });
      it("should find a single track matching the given id", () => {
        const query = spotify.find({
          tracks: {
            where: {
              id: "11dFghVXANMlKmJXsNCbNl"
            }
          }
        });
        expect(query.query).toBe("tracks/11dFghVXANMlKmJXsNCbNl");
      });
    });
  });
  describe("user", () => {
    describe("following", () => {
      it("should check if the current user is following another user", () => {
        const query = spotify
          .user()
          .follows({ id: "exampleuser01", type: "user" });

        expect(query.query).toBe(
          "me/following/contains?type=user&ids=exampleuser01"
        );
      });
      it("should check if the current user is following several artists", () => {
        const query = spotify.user().follows({
          ids: ["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"],
          type: "artist"
        });

        expect(query.query).toBe(
          "me/following/contains?type=artist&ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q"
        );
      });

      it("should follow a user", () => {
        const query = spotify
          .user()
          .follow({ id: "exampleuser01", type: "user" });

        expect(query.query).toBe("me/following?type=user&ids=exampleuser01");
      });
      it("should follow several artists", () => {
        const query = spotify.user().follow({
          ids: ["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"],
          type: "artist"
        });
        expect(query.query).toBe(
          "me/following?type=artist&ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q"
        );
      });

      it("should follow a playlist", () => {
        // TODO modify header to add public/private tag
        const query = spotify
          .user()
          .follow({ id: "2v3iNvBX8Ay1Gt2uXtUKUT", type: "playlist" });

        expect(query.query).toBe("playlists/2v3iNvBX8Ay1Gt2uXtUKUT/followers");
      });

      it("should get the current users artists that they are following", () => {
        const query = spotify.user().getFollowed({ type: "artist" });

        expect(query.query).toBe("me/following?type=artist");
      });
      it("should unfollow the target user", () => {
        const query = spotify
          .user()
          .unfollow({ id: "exampleuser01", type: "user" });

        expect(query.query).toBe("me/following?type=user&ids=exampleuser01");
      });
      it("should unfollow the target playlist", () => {
        const query = spotify
          .user()
          .unfollow({ id: "65V6djkcVRyOStLd8nza8E", type: "playlist" });
        expect(query.query).toBe("playlists/65V6djkcVRyOStLd8nza8E/followers");
      });
    });
    describe("library", () => {
      // it("should check if an album exists in the library matching the given id", () => {
      //   const query = spotify
      //     .user()
      //     .library()
      //     .contains({ id: "0pJJgBzj26qnE1nSQUxaB0", type: "album" });
      //   expect(query.query).toBe(
      //     "me/albums/contains?ids=0pJJgBzj26qnE1nSQUxaB0"
      //   );
      // });
      // it("should check if multiple tracks exists in the library matching the given ids", () => {
      //   const query = spotify
      //     .user()
      //     .library()
      //     .contains({
      //       ids: ["0udZHhCi7p1YzMlvI4fXoK", "3SF5puV5eb6bgRSxBeMOk9"],
      //       type: "tracks"
      //     });
      //   expect(query.query).toBe(
      //     "me/tracks/contains?ids=0udZHhCi7p1YzMlvI4fXoK,3SF5puV5eb6bgRSxBeMOk9"
      //   );
      // });
      it("should get all tracks in the users library", () => {
        const query = spotify
          .user()
          .library()
          .get("tracks");
        expect(query.query).toBe("/me/tracks");
      });
      it("should get all albums in the users library", () => {
        const query = spotify
          .user()
          .library()
          .get("albums");
        expect(query.query).toBe("/me/albums");
      });
      it("should get delete tracks in the library matching the given ids", () => {
        const query = spotify
          .user()
          .library()
          .delete({ type: "tracks", ids: ["123", "456"] });
        expect(query.query).toBe("/me/tracks");
      });
      it("should add a single album in the library matching the given id", () => {
        const query = spotify
          .user()
          .library()
          .add({ type: "albums", ids: "123" });
        expect(query.query).toBe("/me/albums");
      });
    });
  });

  //describe("browse", () => {
  //   // it("should get a category matching the given id", ()=>{
  //   //   const query = spotify.browse({})

  //   //   expect(query.query).toBe('browse/categories/party')
  //   // });
  //   it("should get all categories", () => {
  //     const query = spotify.browse("categories");
  //     expect(query.query).toBe("browse/categories");
  //   });
  //   it("should get all featured playlists", () => {
  //     const query = spotify.browse("featured-playlists");
  //     expect(query.query).toBe("browse/featured-playlists");
  //   });
  //   it("should get all new releases", () => {
  //     const query = spotify.browse("new-releases");
  //     expect(query.query).toBe("browse/new-releases");
  //   });
  //   it("should get all recommendations", () => {
  //     const query = spotify.browse("recommendations");
  //     expect(query.query).toBe("browse/recommendations");
  //   });
  // });
});
