//give database access to route that calls this function
// no database access should be allowed in this

module.exports = {
  getAudioFeatures: async (uris, accessToken) => {
    // gets an audio features of each track from spotify
    // returns a list of audio features
  },
  recommendTracks: async (uris, accessToken) => {
    // Check spotify api for tracks similar to selected tracks
    // return those tracks
  },
  createVibe: features => {
    const totals = {};

    features.forEach(feature => {
      Object.entries(feature).forEach(([k, v]) => {
        totals[k] =
          totals[k] === undefined ? 0 : totals[k] + v / features.length;
      });
    });

    return totals;
    // features is a list of audio features for spotify tracks
    // finds the average features
    // returns a vibe object
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
