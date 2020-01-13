const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
  name: String,
  location: String,
  playlist: [{ uri: String }],
  currentSong: { playing: Boolean, uri: String, lastSeek: Number },
  createdAt: {
    type: Date,
    default: Date.now
  },
  subscribers: [{ userId: String, socketId: String, scope: String }],
  host: { socketId: String },
  password: String,
  history: [{ uri: String }],
  recommendations: {
    topTracks: [
      {
        _id: false,
        userId: String,
        tracks: [
          {
            _id: false,
            id: String,
            uri: String,
            similarity: Number,
            properties: {
              _id: false,
              acousticness: Number,
              danceability: Number,
              energy: Number,
              instrumentalness: Number,
              speechiness: Number,
              valence: Number
            }
          }
        ]
      }
    ],
    topArtists: [{ userId: String, artists: [{ uri: String }] }],
    topGenres: [{ userId: String, genres: [{ uri: String }] }],
    vibe: {
      properties: {
        acousticness: {
          sd: Number,
          variance: Number,
          mean: Number,
          weight: Number
        },
        danceability: {
          sd: Number,
          variance: Number,
          mean: Number,
          weight: Number
        },
        energy: { sd: Number, variance: Number, mean: Number, weight: Number },
        instrumentalness: {
          sd: Number,
          variance: Number,
          mean: Number,
          weight: Number
        },
        speechiness: {
          sd: Number,
          variance: Number,
          mean: Number,
          weight: Number
        },
        valence: { sd: Number, variance: Number, mean: Number, weight: Number }
      },
      n: Number
    },
    playlist: {
      selected: [{ _id: false, uri: String }],
      generated: [{ _id: false, uri: String }]
    }
  }
});
RoomSchema.method("toObj", function() {
  const obj = this.toObject();
  obj.recommendations.topTracks.forEach(track => {
    delete track._id;
  });
  return obj;
});

RoomSchema.method("toClient", function() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  obj.playlist.forEach(track => {
    delete track._id;
  });

  obj.subscribers.forEach(user => {
    delete user._id;
  });

  if (obj.password) {
    delete obj.password;
    obj.requiresPassword = true;
  }
  delete obj.recommendations.topTracks;
  delete obj.recommendations.topArtists;
  delete obj.recommendations.topGenres;

  return obj;
});
RoomSchema.pre("save", next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("rooms", RoomSchema);
