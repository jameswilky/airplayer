//give database access to route that calls this function
// no database access should be allowed in this

const fetch = require("node-fetch");

const api = "https://api.spotify.com/v1/";

module.exports = {
  getAudioFeatures: async (uris, accessToken) => {
    const query = `audio-features?ids=${uris}`;
    const res = awaitfetch(`${api}${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ["Content-type"]: "application/json"
      },
      method: "GET"
    });
    return await res.json();
  },
  recommendTracks: async (uris, accessToken) => {
    // Check spotify api for tracks similar to selected tracks
    // return those tracks
  },
  createVibe: tracks => {
    const validProperties = [
      "acousticness",
      "danceability",
      "energy",
      "instrumentalness",
      "liveness",
      "speechiness",
      "valence"
    ];
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

    return {
      properties,
      n: tracks.length
    };
  },
  mergeVibe: (vibe, features) => {
    // merges audo features from a list of tracks to update the vibe to be
    // weighted to include the audio features of the added tracks
  },
  filterTracksByVibe: (topTracks, vibe) => {
    // takes in a hash map of topTracks and their audio features sorted by user ID
    // and returns tracks that are within a certain range of the vibe object
  }
};
