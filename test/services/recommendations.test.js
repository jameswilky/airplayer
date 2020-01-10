const {
  createVibe,
  getAudioFeatures,
  calculateSimilarity,
  getSimilarTracks
} = require("../../server/services/recommendations");
const expect = require("chai").expect;

const token =
  "BQDwvSCP1I7UUvYIg6WZ3h11_zbvjIGCRfq0qq5cwZonCHLd0P_SuHf7GsM_E1Y9YeeA3H4g9iQafkBo0Avj8s-OLVDX7pU6PvsxBdwkDAHLI1ZmBrAi3XB2Xf2B9fCCQXgDfDLnpTcw7LQrX4zTij0GnCT-EbnEJNCA_ZlZpgx5hhPvOeKj4agGaez65UBqfvMj";

const exampleTopTracks = [
  {
    userId: "james",
    tracks: [
      {
        uri: "1",
        similarity: undefined,
        properties: {
          acousticness: 0.1,
          speechiness: 0.2,
          instrumentalness: 0.1,
          valence: 0.5,
          danceability: 0.8,
          energy: 0.5,
          liveness: 0.7
        }
      },
      {
        uri: "2",
        similarity: undefined,
        properties: {
          acousticness: 0.5,
          speechiness: 0.1,
          instrumentalness: 0.2,
          valence: 0.6,
          danceability: 0.2,
          energy: 0.7,
          liveness: 0.1
        }
      }
    ]
  },
  {
    userId: "456",
    tracks: [
      {
        uri: "3",
        similarity: undefined,
        properties: {
          acousticness: 0.8,
          speechiness: 0.1,
          instrumentalness: 0.1,
          valence: 0.2,
          danceability: 0.1,
          energy: 0.2,
          liveness: 0.1
        }
      },
      {
        uri: "4",
        similarity: undefined,
        properties: {
          acousticness: 0.2,
          speechiness: 0.5,
          instrumentalness: 0.7,
          valence: 0.1,
          danceability: 0.2,
          energy: 0.5,
          liveness: 0.9
        }
      }
    ]
  }
];

const exampleVibe = {
  properties: {
    danceability: {
      mean: 0.5176666666666666,
      variance: 0.011549555555555554,
      sd: 0.10746885853844151
    },
    energy: {
      mean: 0.9033333333333333,
      variance: 0.0024415555555555553,
      sd: 0.04941209928302536
    },
    speechiness: {
      mean: 0.09169999999999999,
      variance: 0.0013449799999999997,
      sd: 0.03667396896982927
    },
    acousticness: {
      mean: 0.0009649999999999999,
      variance: 0.0000010593526666666666,
      sd: 0.0010292485932303559
    },
    instrumentalness: {
      mean: 0.027686666666666665,
      variance: 0.0006640816888888889,
      sd: 0.0257697824765536
    },
    liveness: {
      mean: 0.1062,
      variance: 0.0001927466666666668,
      sd: 0.013883323329328134
    },
    valence: {
      mean: 0.35,
      variance: 0.009708666666666666,
      sd: 0.09853256652836495
    }
  },
  n: 3
};
describe("recommendations service", () => {
  // describe("getAudioFeatures", () => {
  //   it("works", () => {
  //     getAudioFeatures(
  //       [
  //         "7ouMYWpwJ422jRcDASZB7P",
  //         "4VqPOruhp5EdPBeR92t6lQ",
  //         "2takcwOaAZWiXQijPHIx7B"
  //       ],
  //       token
  //     );
  //   });
  // });
  describe("getSimilarTracks", () => {
    it("returns tracks with the specified similarity rating", () => {
      const topTracks = calculateSimilarity(exampleTopTracks, exampleVibe);

      const similarTracks = getSimilarTracks(topTracks, 0.2);
      expect(similarTracks[0].uri).to.eql("2");
      expect(similarTracks[1].uri).to.eql("3");
    });
  });
  describe("calculateSimilarity", () => {
    it("assigns a similarity rating to the top Tracks", () => {
      const topTracks = calculateSimilarity(exampleTopTracks, exampleVibe);
      expect(topTracks[0].tracks[0].similarity).to.be.within(0.034, 0.1);
      expect(topTracks[0].tracks[1].similarity).to.eql(0.23765017732671354);
    });
  });
  describe("createVibe", () => {
    it("averages the properties within the vibe object", () => {
      const features = [
        {
          acousticness: 0,
          danceability: 0,
          energy: 0,
          instrumentalness: 0,
          liveness: 0,
          speechiness: 0,
          valence: 0
        },
        {
          acousticness: 1,
          danceability: 1,
          energy: 1,
          instrumentalness: 1,
          liveness: 1,
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
          liveness: 1,
          speechiness: 1,
          valence: 1
        },
        {
          acousticness: 3,
          danceability: 3,
          energy: 3,
          instrumentalness: 3,
          liveness: 3,
          speechiness: 3,
          valence: 3
        },
        {
          acousticness: 5,
          danceability: 5,
          energy: 5,
          instrumentalness: 5,
          liveness: 5,
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
          liveness: 0.1,
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
