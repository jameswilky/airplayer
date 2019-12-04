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
  password: String
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
