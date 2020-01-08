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
        userId: String,
        tracks: [
          {
            uri: String,
            durationMs: Number,
            key: Number,
            mode: Number,
            timeSignature: Number,
            acousticness: Number,
            danceability: Number,
            energy: Number,
            instrumentalness: Number,
            liveness: Number,
            loudness: Number,
            speechiness: Number,
            valence: Number,
            tempo: Number
          }
        ]
      }
    ],
    topArtists: [{ userId: String, artists: [{ uri: String }] }],
    topGenres: [{ userId: String, genres: [{ uri: String }] }],
    vibe: {
      properties: {
        acousticness: { sd: Number, variance: Number, mean: Number },
        danceability: { sd: Number, variance: Number, mean: Number },
        duration: { sd: Number, variance: Number, mean: Number },
        energy: { sd: Number, variance: Number, mean: Number },
        instrumentalness: { sd: Number, variance: Number, mean: Number },
        key: { sd: Number, variance: Number, mean: Number },
        liveness: { sd: Number, variance: Number, mean: Number },
        loudness: { sd: Number, variance: Number, mean: Number },
        mode: { sd: Number, variance: Number, mean: Number },
        popularity: { sd: Number, variance: Number, mean: Number },
        speechiness: { sd: Number, variance: Number, mean: Number },
        tempo: { sd: Number, variance: Number, mean: Number },
        timeSignature: { sd: Number, variance: Number, mean: Number },
        valence: { sd: Number, variance: Number, mean: Number }
      },
      n: Number
    },
    playlist: { selected: [{ uri: String }], generated: [{ uri: String }] }
  }
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
  delete obj.recommendations;

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
