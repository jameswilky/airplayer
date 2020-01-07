const {
  createVibe,
  getAudioFeatures
} = require("../../server/services/recommendations");
const expect = require("chai").expect;

const token =
  " BQA-dazXSwl_zhyKbrCaalFvNQrDiAkxyEpeU4e-MqSykJolUUmvH4zZ440MVBvd7KAz7CE4SQdrl8LPWoDEt8YRVl3jbHd0DzEW0oBi6Jm4g_LGDoTxZ-wEpyJP-IRd3-BA-w0q5r9sByQmO9Ew7JR_CY5w-0e-AS77kl5lOPtTz5onD-DTE2NVQ4dF4dLcgnEb";
describe("recommendations service", () => {
  describe("getAudioFeatures", () => {
    it.only("works", () => {
      getAudioFeatures(["11dFghVXANMlKmJXsNCbNl"], token);
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
