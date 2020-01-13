const {
  createVibe,
  getAudioFeatures,
  calculateSimilarity,
  getSimilarTracks
} = require("../../server/services/recommendations");
const expect = require("chai").expect;
const token =
  "BQAb7xVWGxCBIxoSFARO_u2hBL_MXRAzL6pYQ3zvga-8P3upWJhnprKHllPACYs65TSN0rhKOdoEBKnLLglIjx4My71K41nHTI_jbqvwZnZAdYgu88wgByYyyX2T2WRY6YxtyheSCmR6tPRmzG_TigzSmYVbwcXE8CzYpkK6w1LzAFGuA3hEe-BPXIJcrF5j6Zhp";

const exampleTopTracks = [
  {
    userId: "james",
    tracks: [
      // {
      //   uri: "1",
      //   similarity: undefined,
      //   properties: {
      //     acousticness: 0.1,
      //     speechiness: 0.2,
      //     instrumentalness: 0.1,
      //     valence: 0.5,
      //     danceability: 0.8,
      //     energy: 0.5
      //   }
      // },
      // Manually write this out and find out why similarity it negative
      {
        uri: "2",
        similarity: undefined,
        properties: {
          acousticness: 0.5,
          speechiness: 0.1,
          instrumentalness: 0.2,
          valence: 0.6,
          danceability: 0.2,
          energy: 0.7
        }
      }
    ]
  }
  // {
  //   userId: "456",
  //   tracks: [
  //     {
  //       uri: "3",
  //       similarity: undefined,
  //       properties: {
  //         acousticness: 0.8,
  //         speechiness: 0.1,
  //         instrumentalness: 0.1,
  //         valence: 0.2,
  //         danceability: 0.1,
  //         energy: 0.2
  //       }
  //     },
  //     {
  //       uri: "4",
  //       similarity: undefined,
  //       properties: {
  //         acousticness: 0.2,
  //         speechiness: 0.5,
  //         instrumentalness: 0.7,
  //         valence: 0.1,
  //         danceability: 0.2,
  //         energy: 0.5
  //       }
  //     }
  //   ]
  // }
];

describe("recommendations service", () => {
  describe("getAudioFeatures", () => {
    it("works", () => {
      getAudioFeatures(
        [
          "7ouMYWpwJ422jRcDASZB7P",
          "4VqPOruhp5EdPBeR92t6lQ",
          "2takcwOaAZWiXQijPHIx7B"
        ],
        token
      );
    });
  });
  describe("getSimilarTracks", () => {
    it("returns tracks with the specified similarity rating", () => {
      const topTracks = calculateSimilarity(exampleTopTracks, exampleVibe);

      const similarTracks = getSimilarTracks(topTracks, 0.2);
    });
  });
  describe("calculateSimilarity", () => {
    it("assigns a similarity rating to the top Tracks", () => {});
  });
  describe("createVibe", () => {
    it("averages the properties within the vibe object", () => {
      const features = [
        {
          acousticness: 0,
          danceability: 0,
          energy: 0,
          instrumentalness: 0,
          speechiness: 0,
          valence: 0
        },
        {
          acousticness: 1,
          danceability: 1,
          energy: 1,
          instrumentalness: 1,
          speechiness: 1,
          valence: 1
        }
      ];

      const { properties } = createVibe(features);
      Object.entries(properties).forEach(([k, v]) => {
        expect(v.mean).equals(0.5);
      });

      const features2 = [
        {
          acousticness: 1,
          danceability: 1,
          energy: 1,
          instrumentalness: 1,
          speechiness: 1,
          valence: 1
        },
        {
          acousticness: 3,
          danceability: 3,
          energy: 3,
          instrumentalness: 3,
          speechiness: 3,
          valence: 3
        },
        {
          acousticness: 5,
          danceability: 5,
          energy: 5,
          instrumentalness: 5,
          speechiness: 5,
          valence: 5
        }
      ];

      const vibe2 = createVibe(features2);
      Object.entries(vibe2.properties).forEach(([k, v]) => {
        expect(v.mean).equals(3);
      });
    });
    it("returns a vibe object", () => {
      const features = [
        {
          acousticness: 0.2,
          danceability: 1,
          energy: 0.9,
          instrumentalness: 0.2,
          speechiness: 0.6,
          valence: 0.2
        }
      ];

      const { properties } = createVibe(features);
      Object.keys(features[0]).forEach(feature => {
        expect(properties).has.property(feature);
      });
    });
  });
});
