const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
  name: String,
  location: String,
  playlist: [{ trackId: String }],
  currentSong: { playing: Boolean, trackId: String },
  createdAt: { type: Date, default: Date.now },
  subscribers: [{ type: Schema.Types.ObjectId, ref: "users" }]
});

RoomSchema.pre("save", next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("rooms", RoomSchema);
