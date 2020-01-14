//give database access to route that calls this function
// no database access should be allowed in this

const fetch = require("node-fetch");

const api = "https://api.spotify.com/v1/";
const validProperties = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "speechiness",
  "valence"
];

// reference https://www.kaggle.com/zaheenhamidani/ultimate-spotify-tracks-db
const populationAudioFeatures = {
  acousticness: {
    mean: 0.37,
    sd: 0.35
  },
  danceability: {
    mean: 0.55,
    sd: 0.19
  },
  energy: {
    mean: 0.57,
    sd: 0.26
  },
  instrumentalness: { mean: 0.15, sd: 0.3 },
  speechiness: { mean: 0.12, sd: 0.19 },
  valence: { mean: 0.45, sd: 0.26 } // could be slightly biases to low valence
};

module.exports = {
  getAudioFeatures: async (ids, accessToken) => {
    const query = `audio-features?ids=${ids}`;
    const res = await fetch(`${api}${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ["Content-type"]: "application/json"
      },
      method: "GET"
    });
    const data = await res.json();
    return data;
  },
  recommendTracks: async (ids, accessToken) => {
    const query = `recommendations?seed_tracks=${ids.slice(0, 5)}`;
    const res = await fetch(`${api}${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ["Content-type"]: "application/json"
      },
      method: "GET"
    });
    const data = await res.json();
    return data;
  },
  createVibe: tracks => {
    const properties = {};

    // Calculate means
    tracks.forEach(feature => {
      Object.entries(feature)
        .filter(([k]) => validProperties.includes(k))
        .forEach(([k, v]) => {
          properties[k] =
            properties[k] === undefined
              ? { mean: Math.abs(Number.isNaN(v) ? 0 : v) / tracks.length }
              : {
                  mean:
                    properties[k].mean +
                    Math.abs(Number.isNaN(v) ? 0 : v) / tracks.length
                };
        });
    });

    // Calculate variance and standard deviation
    tracks.forEach(feature => {
      Object.entries(feature)
        .filter(([k]) => validProperties.includes(k))
        .forEach(([k, v]) => {
          properties[k].variance =
            properties[k].variance === undefined
              ? Math.pow(v - properties[k].mean, 2) / tracks.length
              : Math.pow(v - properties[k].mean, 2) / tracks.length +
                properties[k].variance;
        });
    });
    // Calculate standard deviation
    Object.keys(properties).forEach(k => {
      properties[k].sd = Math.sqrt(properties[k].variance);
    });

    // Add weighting for each property
    Object.keys(properties).forEach(k => {
      properties[k].weight =
        Math.abs(populationAudioFeatures[k].mean - properties[k].mean) /
        populationAudioFeatures[k].sd /
        validProperties.length;
      // properties[k].weight =
      //   Math.abs(populationAudioFeatures[k].mean - properties[k].mean) /
      //   ((populationAudioFeatures[k].sd + properties[k].sd) / 2) /
      //   validProperties.length;
    });

    // Object.keys(properties).forEach(k => {
    //   properties[k].weight =
    //     Math.abs(populationAudioFeatures[k].mean - properties[k].mean) /
    //     populationAudioFeatures[k].sd;
    // });

    // const totalWeight = Object.keys(properties)
    //   .map(key => properties[key].weight)
    //   .reduce((total, cur) => (total += cur));

    // Object.keys(properties).forEach(
    //   k => (properties[k].weight = properties[k].weight / totalWeight)
    // );
    return {
      properties,
      n: tracks.length
    };
  },
  mergeVibe: (vibe, features) => {
    // merges audo features from a list of tracks to update the vibe to be
    // weighted to include the audio features of the added tracks
  },
  calculateSimilarity: (topTracks, vibe) => {
    return topTracks.map(user => {
      const nextTracks = user.tracks.map(track => {
        const values = Object.entries(track.properties)
          .filter(([key, val]) => {
            return validProperties.includes(key);
          })
          .map(
            ([k, v]) =>
              Math.abs(vibe.properties[k].mean - v) * vibe.properties[k].weight
          );
        const similarity = 1 - values.reduce((total, cur) => (total += cur));

        return { ...track, similarity: similarity };
      });
      const sortedTracks = nextTracks.sort((a, b) =>
        a.similarity < b.similarity ? 1 : -1
      );
      return {
        ...user,
        tracks: sortedTracks
      };
    });
  },
  getSimilarTracks: (topTracks, minSimilarity) => {
    // instead of searching each track, just stop once we find min sim rating as all tracks are ordered
    return topTracks
      .map(user =>
        user.tracks
          .filter(track => track.similarity > minSimilarity)
          .map(track => {
            return { uri: track.uri };
          })
      )
      .reduce((acc, val) => acc.concat(val), []);
  }
};
